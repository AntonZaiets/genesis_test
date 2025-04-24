import { Routes, Route, Navigate } from 'react-router-dom';
import TrackPage from './pages/TracksPage/TracksPage.tsx';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className='App'>
                <Routes>
                    <Route path='/tracks' element={<TrackPage />} />
                    <Route path='/' element={<Navigate to='/tracks' replace />} />
                    <Route path='*' element={<div>404 Not Found</div>} />
                </Routes>

                <LoadingIndicator />
                <ToastContainer
                    data-testid='toast-container'
                    position='bottom-right'
                    autoClose={3000}
                />
            </div>
        </QueryClientProvider>
    );
};

export default App;

