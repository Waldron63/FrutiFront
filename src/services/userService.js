const API_ULR = 'http://localhost:8080/api/users';
// crear un nuevo usuario
export const createUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error('Error al crear el usuario');
        }
        return await response.json();
    } catch (error) {
        console.error('Error en el servicio de usuarios:', error);
        throw error;
    }
};
// borrar un usuario
export const deleteUser = async(id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el usuario');
        }
        return true;
    } catch (error) {
        console.error('Error en el servicio de usuarios:', error);
        throw error;
    }
}
//actualizar contraseña usuario
export const updatePassword = async (password, id) => {
    try {
        const response = await fetch(`${API_URL}/password/${password}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: password }),
        });
        if (!response.ok) {
            throw new Error('Error al actualizar la contraseña');
        }
        return true;
    } catch (error) {
        console.error('Error en el servicio de usuarios:', error);
        throw error;
    }
};


