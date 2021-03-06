(function($,window,document){
	$(document).ready(function() {
		var addToBlacklistAddedBy = $('.cm-add-to-blacklist-added-by');
		var addToBlacklist = $('input[type=checkbox][name=add-to-blacklist]');
		addToBlacklist.bind('click', function() {
			var checked = addToBlacklist.is(':checked');
			if (checked) addToBlacklistAddedBy.removeClass('hidden');
			else addToBlacklistAddedBy.addClass('hidden');
		});

		var resendEmail = $('input[type=checkbox][name=resend-email]');
		var paymentStatus = $('#payment-status');
		var paymentStatusOldVal = paymentStatus.val();
		var paymentStatusChanged = function() {
			var paymentStatusNewVal = paymentStatus.val();
			if (paymentStatusNewVal != paymentStatusOldVal) {
				paymentStatusOldVal = paymentStatusNewVal;
				resendEmail.prop('checked', (paymentStatusNewVal == 'Completed'));
			}
		};
		paymentStatus.bind('change', paymentStatusChanged);
		paymentStatus.bind('keydown', paymentStatusChanged);
		paymentStatus.bind('keyup', paymentStatusChanged);
		paymentStatus.bind('mousedown', paymentStatusChanged);
		paymentStatus.bind('mouseup', paymentStatusChanged);

		$('body').bind('keydown', function(event) {
			switch (event.which) {
				case 27:
					window.close();
					break;
				case 83:
					if (!event.shiftKey || !(event.ctrlKey || event.metaKey)) return;
					var e = $('input[type=submit]');
					if (e.length == 1) e.click();
					break;
				default:
					return;
			}
			event.stopPropagation();
			event.preventDefault();
		});
	});
})(jQuery,window,document);