import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  await db.query(`
    INSERT INTO departments (name, description) VALUES
      ('Science', 'Department of Science and Technology'),
      ('Athletics', 'Department of Physical Education'),
      ('Philosophy', 'Department of Ethics and Philosophy'),
      ('History', 'Department of Historical Studies');

    INSERT INTO faculty (name, bioImage, bioDescription, department_id) VALUES
      ('Beast', 'https://example.com/beast.jpg', 'Dr. Henry McCoy, expert in genetics and mutation.', 1),
      ('Forge', 'https://example.com/forge.jpg', 'Inventor with a knack for creating high-tech tools.', 1),

      ('Wolverine', 'https://example.com/wolverine.jpg', 'Logan teaches advanced combat and survival.', 2),
      ('Colossus', 'https://example.com/colossus.jpg', 'Piotr Rasputin specializes in strength training.', 2),

      ('Professor X', 'https://example.com/professorx.jpg', 'Founder of Xavier''s School, teaching ethics and leadership.', 3),
      ('Jean Grey', 'https://example.com/jeangrey.jpg', 'Teaches emotional intelligence and telepathy-related studies.', 3),

      ('Storm', 'https://example.com/storm.jpg', 'Ororo Munroe lectures on weather patterns and African mythology.', 4),
      ('Nightcrawler', 'https://example.com/nightcrawler.jpg', 'Teaches religious studies and European history.', 4);
  `);
}
