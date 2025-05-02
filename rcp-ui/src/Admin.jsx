import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBBtn,
    MDBBadge,
    MDBSpinner
} from 'mdb-react-ui-kit';
import { Alert } from 'react-bootstrap';
import AdminService from './service/adminservice';
import AuthService from './service/authservice';

const Admin = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAdminAccess = async () => {
            const isAdmin = await AuthService.checkAdminRole();
            if (!isAdmin) {
                navigate('/');
            } else {
                fetchData(activeTab);
            }
        };

        checkAdminAccess();
    }, [navigate]);

    const fetchData = async (tab) => {
        setLoading(true);
        setError(null);

        try {
            if (tab === 'users') {
                const userData = await AdminService.getAllUsers();
                const processedUsers = userData.map(user => ({
                    ...user,
                    role: user.roles?.includes('ADMIN') ? 'ADMIN' : 'USER',
                }));
                setUsers(processedUsers);
            } else if (tab === 'recipes') {
                const recipeData = await AdminService.getAllRecipes();
                setRecipes(recipeData);
            }
        } catch {
            setError('Failed to load data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (tab) => {
        if (tab !== activeTab) {
            setActiveTab(tab);
            fetchData(tab);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            try {
                await AdminService.deleteUser(userId);
                setUsers(users.filter(user => user.id !== userId));
            } catch {
                setError('Failed to delete user.');
            }
        }
    };

    const handleToggleUserRole = async (userId, currentRole) => {
        const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';

        try {
            await AdminService.updateUserRole(userId, newRole);
            setUsers(users.map(user =>
                user.id === userId ? { ...user, role: newRole } : user
            ));
        } catch {
            setError('Failed to update user role.');
        }
    };

    const handleDeleteRecipe = async (recipeId) => {
        if (window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
            try {
                await AdminService.deleteRecipe(recipeId);
                setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
            } catch {
                setError('Failed to delete recipe.');
            }
        }
    };

    const handleViewRecipe = (recipeId) => {
        navigate(`/recipe/${recipeId}`);
    };

    return (
        <MDBContainer className="mt-5">
            <h2 className="mb-4">Admin Dashboard</h2>

            {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

            <MDBTabs className="mb-3">
                <MDBTabsItem>
                    <MDBTabsLink
                        onClick={() => handleTabChange('users')}
                        active={activeTab === 'users'}
                    >
                        Manage Users
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink
                        onClick={() => handleTabChange('recipes')}
                        active={activeTab === 'recipes'}
                    >
                        Manage Recipes
                    </MDBTabsLink>
                </MDBTabsItem>            </MDBTabs>
            <MDBTabsContent>
                <div className={activeTab === 'users' ? 'd-block' : 'd-none'}>
                    {loading ? (
                        <div className="text-center my-5">
                            <MDBSpinner />
                        </div>
                    ) : (
                        <MDBTable hover responsive>
                            <MDBTableHead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>
                                            <MDBBadge color={user.role === 'ADMIN' ? 'danger' : 'info'}>
                                                {user.role}
                                            </MDBBadge>
                                        </td>
                                        <td>
                                            <MDBBtn
                                                color={user.role === 'ADMIN' ? 'warning' : 'success'}
                                                size="sm"
                                                className="me-2"
                                                onClick={() => handleToggleUserRole(user.id, user.role)}
                                            >
                                                {user.role === 'ADMIN' ? 'Remove Admin' : 'Make Admin'}
                                            </MDBBtn>
                                            <MDBBtn
                                                color="danger"
                                                size="sm"
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
                                                Delete
                                            </MDBBtn>
                                        </td>
                                    </tr>
                                ))}
                            </MDBTableBody>
                        </MDBTable>
                    )}
                </div>

                <div className={activeTab === 'recipes' ? 'd-block' : 'd-none'}>
                    {loading ? (
                        <div className="text-center my-5">
                            <MDBSpinner />
                        </div>
                    ) : (
                        <MDBTable hover responsive>
                            <MDBTableHead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Created Date</th>
                                    <th>Actions</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {recipes.map(recipe => (
                                    <tr key={recipe.id}>
                                        <td>{recipe.id}</td>
                                        <td>{recipe.title}</td>
                                        <td>{recipe.author}</td>
                                        <td>{new Date(recipe.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <MDBBtn
                                                color="primary"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => handleViewRecipe(recipe.id)}
                                            >
                                                View
                                            </MDBBtn>
                                            <MDBBtn
                                                color="danger"
                                                size="sm"
                                                onClick={() => handleDeleteRecipe(recipe.id)}
                                            >
                                                Delete
                                            </MDBBtn>
                                        </td>
                                    </tr>
                                ))}
                            </MDBTableBody>
                        </MDBTable>
                    )}
                </div>
            </MDBTabsContent>
        </MDBContainer>
    );
};

export default Admin;
