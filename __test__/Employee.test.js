const Employee = require('../lib/Employee');

test('check for employee object', () => {
    const employee = new Employee('Richard', 57, 'richard@gmail.com');

    expect(employee.name).toBe('Richard');
    expect(employee.id).toBe(57);
    expect(employee.email).toBe('richard@gmail.com');
});