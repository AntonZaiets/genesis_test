import FiltersSection from '../../../../components/TrackFilters/TrackFilters.tsx';
import BulkActionsSection from "../../../../components/BulkActionsSection/BulkActionsSection.tsx";

const FiltersAndBulk = ({ state }) => (
    <>
        <FiltersSection
            data-testid="filters-section"
            searchTerm={state.searchTerm}
            onSearchChange={state.setSearchTerm}
            sort={state.sort}
            onSortChange={state.handleSortChange}
            filter={state.filter}
            onFilterChange={state.handleFilterChange}
            genres={state.genres}
            tracksData={state.tracksData}
        />
        <BulkActionsSection
            data-testid="bulk-actions-section"
            isSelectMode={state.isSelectMode}
            selectedTracks={state.selectedTracks}
            onToggleSelectAll={() => state.setSelectedTracks((prev) =>
                prev.length === state.tracksData?.tracks.length
                    ? []
                    : state.tracksData?.tracks.map((t) => t.id)
            )}
            onBulkDelete={() => state.setIsBulkConfirmOpen(true)}
            tracksData={state.tracksData}
        />
    </>
);

export default FiltersAndBulk;
