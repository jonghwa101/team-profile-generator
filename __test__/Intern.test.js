const Intern = require('../lib/Intern');

test('check for Intern object', () => {
    const intern = new Intern('Ralph', 59, 'ralph@gmail.com', 'New York University');

    expect(intern.school).toBe('New York University');
});