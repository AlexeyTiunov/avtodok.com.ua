/*
 *  Document   : login.js
 *  Author     : pixelcave
 *  Description: Custom javascript code used in Login page
 */

var Login = function() {

    // Function for switching form views (login, reminder and register forms)
    var switchView = function(viewHide, viewShow, viewHash){
        viewHide.slideUp(250);
        viewShow.slideDown(250, function(){
            $('input').placeholder();
        });

        if ( viewHash ) {
            window.location = '#' + viewHash;
        } else {
            window.location = '#';
        }
    };

    return {
        init: function() {
            /* Switch Login, Reminder and Register form views */
            var formLogin       = $('#form-login'),
                formReminder    = $('#form-reminder'),
                formRegister    = $('#form-register');

            $('#link-register-login').click(function(){
                switchView(formLogin, formRegister, 'register');
            });

            $('#link-register').click(function(){
                switchView(formRegister, formLogin, '');
            });

            $('#link-reminder-login').click(function(){
                switchView(formLogin, formReminder, 'reminder');
            });

            $('#link-reminder').click(function(){
                switchView(formReminder, formLogin, '');
            });

            // If the link includes the hashtag 'register', show the register form instead of login
            if (window.location.hash === '#register') {
                formLogin.hide();
                formRegister.show();
            }

            // If the link includes the hashtag 'reminder', show the reminder form instead of login
            if (window.location.hash === '#reminder') {
                formLogin.hide();
                formReminder.show();
            }

            /*
             *  Jquery Validation, Check out more examples and documentation at https://github.com/jzaefferer/jquery-validation
             */

            /* Login form - Initialize Validation */
            $('#form-login').validate({
                errorClass: 'help-block animation-slideDown', // You can change the animation class for a different entrance animation - check animations page
                errorElement: 'div',
                errorPlacement: function(error, e) {
                    e.parents('.form-group > div').append(error);
                },
                highlight: function(e) {
                    $(e).closest('.form-group').removeClass('has-success has-error').addClass('has-error');
                    $(e).closest('.help-block').remove();
                },
                success: function(e) {
                    e.closest('.form-group').removeClass('has-success has-error');
                    e.closest('.help-block').remove();
                },
                rules: {
                    'login-login': {
                        required: true,
                        login: true
                    },
                    'login-password': {
                        required: true,
                        minlength: 6
                    }
                },
                messages: {
                    'login-login': 'Будь ласка введіть Ваш логін',
                    'login-password': {
                        required: 'Будь ласка введіть Ваш пароль',
                        minlength: 'Ваш пароль має бути більший 6 символів'
                    }
                }
            });

            /* Reminder form - Initialize Validation */
            $('#form-reminder').validate({
                errorClass: 'help-block animation-slideDown', // You can change the animation class for a different entrance animation - check animations page
                errorElement: 'div',
                errorPlacement: function(error, e) {
                    e.parents('.form-group > div').append(error);
                },
                highlight: function(e) {
                    $(e).closest('.form-group').removeClass('has-success has-error').addClass('has-error');
                    $(e).closest('.help-block').remove();
                },
                success: function(e) {
                    e.closest('.form-group').removeClass('has-success has-error');
                    e.closest('.help-block').remove();
                },
                rules: {
                    'reminder-email': {
                        required: true,
                        email: true
                    }
                },
                messages: {
                    'reminder-email': 'Будь ласка введіть email вказаний при реєстрації'
                }
            });

            /* Register form - Initialize Validation */
            $('#form-register').validate({
                errorClass: 'help-block animation-slideDown', // You can change the animation class for a different entrance animation - check animations page
                errorElement: 'div',
                errorPlacement: function(error, e) {
                    e.parents('.form-group > div').append(error);
                },
                highlight: function(e) {
                    $(e).closest('.form-group').removeClass('has-success has-error').addClass('has-error');
                    $(e).closest('.help-block').remove();
                },
                success: function(e) {
                    if (e.closest('.form-group').find('.help-block').length === 2) {
                        e.closest('.help-block').remove();
                    } else {
                        e.closest('.form-group').removeClass('has-success has-error');
                        e.closest('.help-block').remove();
                    }
                },
                rules: {
                    'register-firstname': {
                        required: true,
                        minlength: 2
                    },
                    'register-lastname': {
                        required: true,
                        minlength: 2
                    },
                     'register-login': {
                        required: true,
                        login: true
                    },
                    'register-email': {
                        required: true,
                        email: true
                    },
                    'register-number': {
                        required: true,
                        minlength:12
                    },
                    'register-password': {
                        required: true,
                        minlength: 6
                    },
                    'register-password-verify': {
                        required: true,
                        equalTo: '#register-password'
                    },
                    'register-terms': {
                        required: true
                    }
                },
                messages: {
                    'register-firstname': {
                        required: 'Будь ласка введіть Ваше ім"я',
                        minlength: 'Будь ласка введіть Ваше ім"я'
                    },
                    'register-lastname': {
                        required: 'Будь ласка введіть Ваше прізвище',
                        minlength: 'Будь ласка введіть Ваше прізвище'
                    },

                    'register-login': {
                        required: 'Будь ласка введіть Ваш логін',
                        minlength: 'Ваш логін має бути більший 3 символів'
                    },
                    'register-email': 'Будь ласка  введіть email',
                    'register-password': {
                        required: 'Будь ласка введіть Ваш пароль',
                        minlength: 'Ваш пароль має бути більший 6 символів'
                    },
                     'register-number': {
                        required: 'Будь ласка введіть Ваш номер телефону у форматі 38097-ХХХ-ХХ-ХХ',
                        minlength: 'Ваш номер має складатися з 12 цифр'
                    },
                    'register-password-verify': {
                        required: 'Будь ласка введіть Ваш пароль',
                        minlength: 'Ваш пароль має бути більший 6 символів',
                        equalTo: 'Пароль не співпадає'
                    },
                    'register-terms': {
                        required: 'Будь ласка погодьтеся з умовами!'
                    }
                }
            });
        }
    };
}();