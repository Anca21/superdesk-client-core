import './styles/search.less';

import * as svc from './services';
import * as directive from './directives';
import { MultiActionBarController } from './controllers';

angular.module('superdesk.search.react', [
    'superdesk.highlights',
    'superdesk.datetime',
    'superdesk.authoring.metadata'
])
    .service('monitoringState', svc.MonitoringState)
    .directive('sdItemsList', directive.ItemList);

angular.module('superdesk.search', [
    'superdesk.api',
    'superdesk.desks',
    'superdesk.activity',
    'superdesk.list',
    'superdesk.keyboard',
    'superdesk.search.react'
])
    .service('search', svc.SearchService)
    .service('savedSearch', svc.SavedSearchService)
    .service('tags', svc.TagService)

    .controller('MultiActionBar', MultiActionBarController)

    .directive('sdSearchFacets', directive.SearchFacets)
    .directive('sdSearchTags', directive.SearchTags)
    .directive('sdSearchResults', directive.SearchResults)
    .directive('sdSearchWithin',  directive.SearchWithin)
    .directive('sdSaveSearch', directive.SaveSearch)
    .directive('sdItemContainer', directive.ItemContainer)
    .directive('sdItemPreview', directive.ItemPreview)
    .directive('sdItemGlobalsearch', directive.ItemGlobalSearch)
    .directive('sdItemSearchbar', directive.ItemSearchbar)
    .directive('sdItemSearch', directive.ItemSearch)
    .directive('sdItemSortbar', directive.ItemSortbar)
    .directive('sdSavedSearchSelect', directive.SavedSearchSelect)
    .directive('sdSavedSearches', directive.SavedSearches)
    .directive('sdSearchContainer', directive.SearchContainer)
    .directive('sdMultiActionBar', directive.MultiActionBar)

    .config(['superdeskProvider', 'assetProvider', function(superdesk, asset) {
        superdesk.activity('/search', {
            description: gettext('Find live and archived content'),
            priority: 200,
            label: gettext('Search'),
            templateUrl: asset.templateUrl('superdesk-search/views/search.html'),
            sideTemplateUrl: 'scripts/superdesk-workspace/views/workspace-sidenav.html'
        });
    }])

    .run(['keyboardManager', 'gettext', function(keyboardManager, gettext) {
        keyboardManager.register('Search', 'ctrl + 0', gettext('Shows search modal'));
        keyboardManager.register('Search', 'v', gettext('Toggles search view'));
    }]);
