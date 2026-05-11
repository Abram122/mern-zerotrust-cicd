import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { AuthContext } from '../context/AuthContext';
import { expect, test, describe, vi } from 'vitest';

describe('Navbar Component', () => {
    test('renders Login and Register links when user is not authenticated', () => {
        render(
            <AuthContext.Provider value={{ user: null }}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Register')).toBeInTheDocument();
        expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    });

    test('renders Logout button and My Profile when user is authenticated', () => {
        const mockLogout = vi.fn();
        render(
            <AuthContext.Provider value={{ user: { name: 'John' }, logout: mockLogout }}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('My Profile')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
    });
});
