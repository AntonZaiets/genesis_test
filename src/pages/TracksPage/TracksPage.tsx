import { Container, Paper } from '@mui/material';
import useTrackPageState from '../../hooks/useTrackPageState.ts';
import HeaderSection from '../../components/HeaderSection/HeaderSection.tsx';
import FiltersAndBulk from './components/FiltersAndBulk/FiltersAndBulk.tsx';
import TrackModals from './components/TrackModals/TrackModals.tsx';
import Tracks from "./components/Tracks/Tracks.tsx";

const TrackPage = () => {
    const state = useTrackPageState();

    return (
        <Container
            data-testid="track-page-container"
            disableGutters
            maxWidth={false}
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}>
            <Paper
                data-testid="track-page-main"
                sx={{
                    flex: 1,
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                }}>
                <HeaderSection
                    data-testid="header-section"
                    isSelectMode={state.isSelectMode}
                    onToggleSelectMode={() => state.setIsSelectMode(!state.isSelectMode)}
                    onOpenModal={() => state.setIsModalOpen(true)}
                />
                <FiltersAndBulk state={state} />
                <Tracks state={state}/>
            </Paper>
            <TrackModals state={state} />
        </Container>
    );
};

export default TrackPage;
