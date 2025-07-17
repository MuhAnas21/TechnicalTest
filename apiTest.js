const chai = await import('chai');
const { expect } = chai;

let axios = await import('axios');
axios = axios.default;

const token = 'e16c4663882a2fd11737d087d0e11f83f00df2fbb470854e2456a109b55dac62';
const apiUrl = 'https://gorest.co.in/public/v2/users';

describe('CRUD Operations with Users API', async function () {
    let createdUserId; 

    // Test Case: Create User
    it('should create a new user', async function () {
        let randomValue = Math.floor(Math.random() * 999999999) + 100000000;
        let newUser = {
            name: 'New User',
            email: `newuser${randomValue}@gmail.com`,
            gender: 'female',
            status: 'inactive'
        };
        console.log(newUser)

        try {
            const response = await axios.post(apiUrl, newUser, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            console.log(response);

            expect(response.status).to.equal(201); 
            expect(response.data).to.have.property('id'); 
            createdUserId = response.data.id; 
            expect(response.data.name).to.equal(newUser.name); 
            expect(response.data.email).to.equal(newUser.email); 
            console.log('Created User:', response.data);
        } catch (error) {
            console.error('Create User Test Failed:', error.message);
            throw error;
        }
    });

    // Test Case: Read Users (Get All Users)
    it('should retrieve users list', async function () {
        try {
            const response = await axios.get(apiUrl, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            expect(response.status).to.equal(200);
            expect(response.data).to.be.an('array');
            console.log('Users Retrieved:', response.data);
        } catch (error) {
            console.error('Read Users Test Failed:', error.message);
            throw error;
        }
    });

    // Test Case: Update User
    it('should update the user information', async function () {
        if (!createdUserId) throw new Error('User ID not available for update');
        let randomValue = Math.floor(Math.random() * 999999999) + 100000000;
        const updatedUser = {
            name: 'Updated User',
            email: `updateduser${randomValue}@example.com`,
            gender: 'male',
            status: 'inactive'
        };

        try {
            const response = await axios.put(`${apiUrl}/${createdUserId}`, updatedUser, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            expect(response.status).to.equal(200); 
            expect(response.data.name).to.equal(updatedUser.name); 
            expect(response.data.email).to.equal(updatedUser.email); 
            console.log('Updated User:', response.data);
        } catch (error) {
            console.error('Update User Test Failed:', error.message);
            throw error;
        }
    });

    // Test Case: Delete User
    it('should delete the created user', async function () {
        if (!createdUserId) throw new Error('User ID not available for delete');

        try {
            const response = await axios.delete(`${apiUrl}/${createdUserId}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            expect(response.status).to.equal(204); // Pastikan status HTTP 204 (No Content)
            console.log('User Deleted:', response.data);
        } catch (error) {
            console.error('Delete User Test Failed:', error.message);
            throw error;
        }
    });
});
