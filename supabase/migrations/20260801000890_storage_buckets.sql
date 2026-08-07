begin;

-- Create storage buckets per storage-buckets.yaml contract
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types) values
  ('public-assets', 'public-assets', true, 10485760, array['image/png','image/jpeg','image/webp','image/svg+xml']),
  ('avatars', 'avatars', false, 5242880, array['image/png','image/jpeg','image/webp']),
  ('challenge-assets', 'challenge-assets', false, 26214400, array['application/pdf','image/png','image/jpeg','image/webp']),
  ('idea-attachments', 'idea-attachments', false, 26214400, array['application/pdf','image/png','image/jpeg','image/webp','text/plain']),
  ('idea-visuals', 'idea-visuals', false, 10485760, array['image/png','image/webp','image/svg+xml','application/pdf']),
  ('evaluation-attachments', 'evaluation-attachments', false, 26214400, array['application/pdf','image/png','image/jpeg','image/webp']),
  ('pilot-evidence', 'pilot-evidence', false, 104857600, array['application/pdf','image/png','image/jpeg','image/webp','video/mp4','text/csv']),
  ('exports', 'exports', false, 104857600, array['application/pdf','text/csv','application/zip']),
  ('sponsor-reports', 'sponsor-reports', false, 104857600, array['application/pdf','text/csv','application/zip'])
on conflict (id) do nothing;

-- Storage RLS policies
-- public-assets: public read, manager write
create policy "public-assets read" on storage.objects for select using (bucket_id = 'public-assets');

-- avatars: owner read/write
create policy "avatars owner read" on storage.objects for select
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "avatars owner write" on storage.objects for insert
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "avatars owner update" on storage.objects for update
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "avatars owner delete" on storage.objects for delete
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

-- idea-attachments: idea owner
create policy "idea-attachments owner read" on storage.objects for select
  using (bucket_id = 'idea-attachments' and private.can_access_storage_resource(name));
create policy "idea-attachments owner write" on storage.objects for insert
  with check (bucket_id = 'idea-attachments' and private.can_access_storage_resource(name));

-- idea-visuals: idea owner or system
create policy "idea-visuals owner read" on storage.objects for select
  using (bucket_id = 'idea-visuals' and private.can_access_storage_resource(name));
create policy "idea-visuals owner write" on storage.objects for insert
  with check (bucket_id = 'idea-visuals' and private.can_access_storage_resource(name));

-- evaluation-attachments: assigned evaluator
create policy "eval-attachments owner read" on storage.objects for select
  using (bucket_id = 'evaluation-attachments' and private.can_access_storage_resource(name));
create policy "eval-attachments owner write" on storage.objects for insert
  with check (bucket_id = 'evaluation-attachments' and private.can_access_storage_resource(name));

commit;
