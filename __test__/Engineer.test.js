const Engineer = require('../lib/Engineer');

test('check for Engineer object', () => {
    const engineer = new Engineer('Jake', 58, 'jake@gmail.com', 'jake123');

    expect(engineer.github).toBe('jake123');
});