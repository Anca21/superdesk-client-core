DuplicateController.$inject = ['api', 'notify', '$rootScope', 'data', 'desks', '$location', 'workspaces', 'session'];
export function DuplicateController(api, notify, $rootScope, data, desks, $location, workspaces, session) {
    var currentDeskId;

    if ($location.path() === '/search' || workspaces.isCustom()) {
        currentDeskId = session.identity.desk || data.item.task.desk;
    } else {
        currentDeskId = desks.getCurrentDeskId();
    }
    api.save('duplicate', {}, {desk: currentDeskId, type: data.item._type, item_id: data.item.item_id}, data.item)
        .then(() => {
            $rootScope.$broadcast('item:duplicate');
            notify.success(gettext('Item Duplicated'));
        });
}
