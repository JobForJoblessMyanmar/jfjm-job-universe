update jobs set
  effect_bg = 'orbring',
  bg_until = now() + interval '30 days',
  effect_frame = 'frame-orbit',
  frame_until = now() + interval '30 days',
  featured = true,
  featured_until = now() + interval '30 days'
where id = 'seed-job-02';

update jobs set
  effect_bg = 'pulsar',
  bg_until = now() + interval '30 days',
  effect_title = 'title-universe',
  title_until = now() + interval '30 days'
where id = 'seed-job-04';

update jobs set
  effect_bg = 'stargate',
  bg_until = now() + interval '30 days',
  effect_frame = 'frame-jfjm',
  frame_until = now() + interval '30 days',
  pinned = true,
  pin_until = now() + interval '30 days'
where id = 'seed-job-08';
