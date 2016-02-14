function pickRandom() {
  var ret;
  switch (Math.floor(Math.random() * 4 + 1)) {
    case 1:
      ret = '#red';
      break;
    case 2:
      ret = '#yellow';
      break;
    case 3:
      ret = '#green';
      break;
    case 4:
      ret = '#blue';
      break;
  }
  return ret;
}


$(document).ready(function() {
  Simon.newRound();

  $('.game-button').on('click', function() {
    var self = this;
    $(self).addClass('active');
    Simon.userInput.push('#' + $(self).attr('id'));
    console.log("USER: " + Simon.userInput);
    if (!Simon.checkSequence()) {
      //End game
      return;
    }
    if (Simon.userInput.length === Simon.currentChain.length) {
      Simon.newRound();
    }
    setTimeout(function() {
      $(self).removeClass('active');
    }, 300)
  })
})

var Simon = {
  currentChain: [],
  userInput: [],

  checkSequence: function() {
    var self = this;
    if (self.currentChain[self.userInput.length - 1] === self.userInput[self.userInput.length - 1]) {
      return true;
    }
    alert('owned!');
    return false
  },
  newRound: function() {
    var self = this;
    self.userInput = [];
    //this.disableInput();
    self.currentChain.push(pickRandom());
    console.log("SIMO: " + self.currentChain);
    self.play();
    //this.enableInput();
  },

  disableInput: function() {
    $('.game-button').attr("disabled", true);
    $('.game-button').css("cursor", 'default');
  },

  enableInput: function() {
    $('.game-button').attr("disabled", false);
    $('.game-button').css("cursor", 'pointer');

  },

  play: function() {
    this.animate(this.currentChain);
  },

  animate: function(sequence) {
    var self = this;
    self.disableInput();
    var i = 0;
    var interval = setInterval(function() {
      self.lightUp(sequence[i]);
      i++;
      if (i >= sequence.length) {
        clearInterval(interval);
        self.enableInput();
      }
    }, 1000);
  },

  lightUp: function(elem) {
    $(elem).addClass('active');
    window.setTimeout(function() {
      $(elem).removeClass('active');
    }, 500);
  }
}
