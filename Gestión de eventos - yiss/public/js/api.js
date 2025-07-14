//Here are implemented the functions to communicate with the API
//Perform HTTP requests with Fetch (GET, POST, PUT, DELETE)

export const api = {
    url: 'http://localhost:3000',

    //function GET
    get: async parameter => {
        try {
            const response = await fetch(`${api.url}${parameter}`);
            if (!response.ok) {
                throw new Error('Error getting data');
            }
            return await response.json();
        }catch (error) {
            console.log('Error in GET request:', error);
            throw error;
        }
    },

    //function POST
    post: async (parameter,data) => {
        try {
            const response = await fetch(`${api.url}${parameter}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Error creating data');
            }
            return await response.json();
        } catch (error) {
            console.error('Error in POST request:', error);
            throw error;
        }
    },

    //function PUT
    put: async (parameter, data) => {
    try {
      const response = await fetch(`${api.url}${parameter}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Error updating data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error in PUT request:', error);
      throw error;
    }
  },

  //function DELETE
  delete: async parameter => {
    try {
        const response = await fetch(`${api.url}${parameter}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error ('Error deleting data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in DELETE request:', error);
        throw error;
    }
  }
}