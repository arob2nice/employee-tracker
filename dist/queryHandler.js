// Import the pool from connection.ts
import { pool } from './connection.js';
class QueryHandler {
    constructor() {
        Object.defineProperty(this, "pool", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: pool
        });
    }
    async createDepartment(name) {
        const sql = 'INSERT INTO department (name) VALUES ($1) RETURNING *;';
        const { rows } = await this.pool.query(sql, [name]);
        return rows[0];
    }
    async listDepartments() {
        const sql = 'SELECT id, name FROM department;';
        const { rows } = await this.pool.query(sql);
        return rows;
    }
    async deleteDepartment(id) {
        const sql = 'DELETE FROM department WHERE id = $1;';
        const { rowCount } = await this.pool.query(sql, [id]);
        return (rowCount ?? 0) > 0;
    }
    async getAllDepartments() {
        // Replace the following with actual database query logic
        return [
            { id: 1, name: 'Engineering' },
            { id: 2, name: 'HR' },
        ];
    }
    async getAllRoles() {
        // Replace the following with actual database query logic
        return [
            { id: 1, title: 'Manager' },
            { id: 2, title: 'Engineer' },
        ];
    }
    async getAllEmployees() {
        // Replace the following with actual database query logic
        return [
            { id: 1, first_name: 'John', last_name: 'Doe', role: 'Manager' },
            { id: 2, first_name: 'Jane', last_name: 'Smith', role: 'Developer' },
        ];
    }
    async addDepartment(dept_name) {
        // Add logic to insert the department into the database
        console.log(`Department "${dept_name}" added to the database.`);
    }
    async addRole(roleData) {
        // Add logic to insert the role into the database
        console.log(`Role "${roleData.title}" added to the database.`);
    }
    async addEmployee(employeeData) {
        // Add logic to insert the employee into the database
        console.log('Employee added:', employeeData);
    }
    async updateEmployeeRole(employee_id, role_id) {
        // Add your database query logic here
        const query = `UPDATE employees SET role_id = $1 WHERE id = $2`;
        await this.pool.query(query, [role_id, employee_id]);
    }
}
export const queryHandler = new QueryHandler();
