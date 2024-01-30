import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RequireAuth } from '../hoc/RequireAuth';
import { AuthProvider } from '../context/AuthContext';
import { Login, Blogs, Admin, Blog } from './pages';
import { Page } from './layouts/Page';

function NotFoundPage() {
    return <div>not found page</div>
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Page />}>
                        <Route index element={<Blogs />}/>
                        <Route path='blog/:blogId' element={<Blog />}/>
                        <Route path='login' element={<Login />}/>
                        <Route path='admin' element={
                            <RequireAuth>
                                <Admin />
                            </RequireAuth>
                        }/>
                    </Route>
                    <Route path='*' element={<NotFoundPage />}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}