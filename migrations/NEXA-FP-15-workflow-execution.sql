-- NEXA FP-15 Workflow Execution Foundation
-- Tested first on isolated Neon child branch br-restless-meadow-b3ez055f.
CREATE TABLE public.workflow_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  workflow_id uuid NOT NULL REFERENCES public.workflow_items(id) ON DELETE CASCADE,
  created_by uuid NOT NULL,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','running','awaiting_human','completed','failed','cancelled')),
  idempotency_key text NOT NULL CHECK (length(btrim(idempotency_key)) > 0),
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (finished_at IS NULL OR started_at IS NULL OR finished_at >= started_at),
  UNIQUE (workspace_id,idempotency_key)
);
CREATE TABLE public.workflow_run_events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  run_id uuid NOT NULL REFERENCES public.workflow_runs(id) ON DELETE CASCADE,
  actor_user_id uuid NOT NULL,
  from_status text,
  to_status text NOT NULL CHECK (to_status IN ('pending','running','awaiting_human','completed','failed','cancelled')),
  event_type text NOT NULL CHECK (event_type IN ('created','transition','human_approved','human_rejected','retry_requested')),
  idempotency_key text NOT NULL CHECK (length(btrim(idempotency_key)) > 0),
  occurred_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (run_id,idempotency_key)
);
ALTER TABLE public.workflow_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_run_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY workflow_runs_member_select ON public.workflow_runs FOR SELECT TO authenticated USING (is_workspace_member(workspace_id));
CREATE POLICY workflow_runs_creator_insert ON public.workflow_runs FOR INSERT TO authenticated WITH CHECK (created_by=current_user_id() AND is_workspace_member(workspace_id));
CREATE POLICY workflow_runs_creator_update ON public.workflow_runs FOR UPDATE TO authenticated USING (created_by=current_user_id() AND is_workspace_member(workspace_id)) WITH CHECK (created_by=current_user_id() AND is_workspace_member(workspace_id));
CREATE POLICY workflow_run_events_member_select ON public.workflow_run_events FOR SELECT TO authenticated USING (is_workspace_member(workspace_id));
CREATE POLICY workflow_run_events_creator_insert ON public.workflow_run_events FOR INSERT TO authenticated WITH CHECK (actor_user_id=current_user_id() AND is_workspace_member(workspace_id));
CREATE OR REPLACE FUNCTION public.nexa_valid_run_transition(p_from text,p_to text) RETURNS boolean LANGUAGE sql IMMUTABLE AS $$ SELECT CASE WHEN p_from=p_to THEN false WHEN p_from='pending' THEN p_to IN ('running','cancelled') WHEN p_from='running' THEN p_to IN ('awaiting_human','completed','failed','cancelled') WHEN p_from='awaiting_human' THEN p_to IN ('running','completed','cancelled') WHEN p_from='failed' THEN p_to IN ('running','cancelled') ELSE false END $$;
ALTER TABLE public.workflow_run_events ADD CONSTRAINT workflow_run_events_transition_check CHECK (event_type <> 'transition' OR (from_status IS NOT NULL AND public.nexa_valid_run_transition(from_status,to_status)));