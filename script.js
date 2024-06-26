$(document).ready(function(){
    $('.radio-circle').click(function(){
      $('.radio-circle').removeClass('selected');
      $(this).addClass('selected');
      $(this).prev('input').prop('checked', true);
      $('#queryTypeError').hide();
    });

    $('#checkbox').change(function(){
      if ($(this).prop('checked')) {
        $('#consentError').hide();
        $(this).removeClass('error-input');
      }
    });

    function handleInputValidation(inputId, errorId, validationFunc) {
      $(inputId).focus(function() {
        $(errorId).hide();
        $(this).removeClass('error-input');
      });

      $(inputId).blur(function() {
        if (!validationFunc($(this).val().trim())) {
          $(errorId).show();
          $(this).addClass('error-input');
        } else {
          $(this).removeClass('error-input').addClass('is-valid');
          $(errorId).hide();
        }
      });

      $(inputId).on('input', function() {
        if (validationFunc($(this).val().trim())) {
          $(this).removeClass('error-input').addClass('is-valid');
          $(errorId).hide();
        }
      });
    }

    function validateNotEmpty(value) {
      return value !== '';
    }

    function validateEmail(value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(value);
    }

    handleInputValidation('#FirstName', '#firstNameError', validateNotEmpty);
    handleInputValidation('#LastName', '#lastNameError', validateNotEmpty);
    handleInputValidation('#email', '#emailError', validateEmail);
    handleInputValidation('#comment', '#commentError', validateNotEmpty);
    $('#contactform').submit(function(event) {
      event.preventDefault(); 
      let isValid = true;
      $('.error-message').hide();
      $('.form-control').removeClass('error-input');
      $('.required').removeClass('error-input');
      const firstName = $('#FirstName').val().trim();
      if (!validateNotEmpty(firstName)) {
        $('#firstNameError').show();
        $('#FirstName').addClass('error-input');
        isValid = false;
      }
      const lastName = $('#LastName').val().trim();
      if (!validateNotEmpty(lastName)) {
        $('#lastNameError').show();
        $('#LastName').addClass('error-input');
        isValid = false;
      }
      const email = $('#email').val().trim();
      if (!validateEmail(email)) {
        $('#emailError').show();
        $('#email').addClass('error-input');
        isValid = false;
      }
      const comment = $('#comment').val().trim();
      if (!validateNotEmpty(comment)) {
        $('#commentError').show();
        $('#comment').addClass('error-input');
        isValid = false;
      }
      const queryType = $('input[name="queryType"]:checked').val();
      if (!queryType) {
        $('#queryTypeError').show();
        isValid = false;
      }
      if (!$('#checkbox').prop('checked')) {
        $('#consentError').show();
        $('#checkbox').addClass('error-input');
        isValid = false;
      }
      if (isValid) {
        $('#success-msg').fadeIn();
        
      }
    });
  });
