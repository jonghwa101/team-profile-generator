const Manager = require('../lib/Manager');

test('check for Manager object', () => {
    const manager = new Manager ('Shelly', 60, 'shelly@gmail.com', 123456);

    expect(manager.officeNumber).toBe(123456);
});