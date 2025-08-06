import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // ✅ Reset tables and auto-incrementing IDs
  await db.query(`TRUNCATE faculty, departments RESTART IDENTITY CASCADE;`);

  // ✅ Insert departments with all fields
  await db.query(`
  INSERT INTO departments (name, description, images, phone, email) VALUES
  ('Science', 'Department of Science and Technology', '/pictures/science.jpg', '555-1234', 'science@fsu.edu'),
  ('Athletics', 'Department of Physical Education', '/pictures/athletics.jpg', '555-5678', 'athletics@fsu.edu'),
  ('Philosophy', 'Department of Ethics and Philosophy', '/pictures/philosophy.jpg', '555-9876', 'philosophy@fsu.edu'),
  ('History', 'Department of Historical Studies', '/pictures/history.jpg', '555-4321', 'history@fsu.edu');
`);

  await db.query(`
  INSERT INTO faculty (name, bioImage, bioDescription, department_id) VALUES
  ('Beast', '/pictures/beast.jpg', 'Dr. Henry McCoy, expert in genetics and mutation.', 1),
  ('Forge', '/pictures/forge.jpg', 'Inventor with a knack for creating high-tech tools.', 1),
  ('Wolverine', '/pictures/wolverine.jpg', 'Logan teaches advanced combat and survival.', 2),
  ('Colossus', '/pictures/colossus.jpg', 'Piotr Rasputin specializes in strength training.', 2),
  ('Professor X', '/pictures/professor-x.jpg', 'Founder of Xavier''s School, teaching ethics and leadership.', 3),
  ('Jean Grey', '/pictures/jean.jpg', 'Teaches emotional intelligence and telepathy-related studies.', 3),
  ('Storm', '/pictures/storm.jpg', 'Ororo Munroe lectures on weather patterns and African mythology.', 4),
  ('Nightcrawler', '/pictures/nightcrawler.jpg', 'Teaches religious studies and European history.', 4);
`);
}
