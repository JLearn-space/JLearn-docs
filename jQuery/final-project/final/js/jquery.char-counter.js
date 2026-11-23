// Плагин $.fn.charCounter: счётчик символов под полем ввода.
// Использование: $("textarea").charCounter({ max: 200 });
// Приоритет лимита: data-max у поля → options.max → 100 по умолчанию.
(function ($) {
    const defaults = {
        max: 100,
        counterClass: "char-counter",
        overClass: "is-over"
    };

    $.fn.charCounter = function (options) {
        const settings = $.extend({}, defaults, options);

        return this.each(function () {
            const $field = $(this);

            // Повторный вызов не создаёт второй счётчик
            if ($field.data("charCounter")) {
                return;
            }

            const max = Number($field.data("max")) || settings.max;
            const $counter = $("<p>", { class: settings.counterClass, "aria-live": "polite" });
            $field.after($counter);
            $field.data("charCounter", true);

            function update() {
                const length = $field.val().length;
                $counter
                    .text(`${length} / ${max}`)
                    .toggleClass(settings.overClass, length > max);
            }

            $field.on("input.charCounter", update);
            update();
        });
    };
})(jQuery);
