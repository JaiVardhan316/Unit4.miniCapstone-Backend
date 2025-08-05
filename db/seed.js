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
  `);

  await db.query(`
    INSERT INTO faculty (name, bioImage, bioDescription, department_id) VALUES
    ('Beast', 'http://localhost:3000/pictures/beast.jpg', 'Dr. Henry McCoy, expert in genetics and mutation.', 1),
    ('Forge', 'http://localhost:3000/pictures/forge.jpg', 'Inventor with a knack for creating high-tech tools.', 1),
    
    ('Wolverine', 'http://localhost:3000/pictures/wolverine.jpg', 'Logan teaches advanced combat and survival.', 2),
    ('Colossus', 'http://localhost:3000/pictures/colossus.jpg', 'Piotr Rasputin specializes in strength training.', 2),
    
    ('Professor X', 'http://localhost:3000/pictures/professor-x.jpg', 'Founder of Xavier''s School, teaching ethics and leadership.', 3),
    ('Jean Grey', 'http://localhost:3000/pictures/jean.jpg', 'Teaches emotional intelligence and telepathy-related studies.', 3),
    
    ('Storm', 'http://localhost:3000/pictures/storm.jpg', 'Ororo Munroe lectures on weather patterns and African mythology.', 4),
    ('Nightcrawler', 'http://localhost:3000/pictures/nightcrawler.jpg', 'Teaches religious studies and European history.', 4);
  `);
}
