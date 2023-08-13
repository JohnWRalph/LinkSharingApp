const options = {
    animation: 150,
    dataIdAttr: "data-id",
    selectedClass: "selected",
    group: { name: "first" },
    handle: ".handle",
    onChange: function (evt) {
        [].forEach.call(
            evt.from.getElementsByClassName("sortable_item"),
            function (el, index) {
                el.setAttribute("id", index);
            }
        );
    },
    onUpdate: function (evt) {
        [].forEach.call(
            evt.from.getElementsByClassName("sortable_item"),
            function (el, index) {
                el.setAttribute("id", index);
            }
        );
    },

    onRemove: function (evt) {
        [].forEach.call(
            evt.from.getElementsByClassName("sortable_item"),
            function (el, index) {
                el.setAttribute("id", index);
            }
        );
    },
    onEnd: function (evt) {
        [].forEach.call(
            evt.from.getElementsByClassName("sortable_item"),
            function (el, index) {
                el.setAttribute("id", index);
            }
        );
    },

    onMove: function (evt) {
        [].forEach.call(
            evt.from.getElementsByClassName("sortable_item"),
            function (el, index) {
                el.setAttribute("id", index);
            }
        );
    },
};

const optionsSelect = {
    animation: 150,
    dataIdAttr: "data-id",
    selectedClass: "selected",
    group: { name: "select" },
    onChange: function (evt) {
   
    },
    onMove: function () {
   
    },
};
export { options, optionsSelect };