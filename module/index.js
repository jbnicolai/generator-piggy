'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var utils = require('../lib/utils');

var ModuleGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');
  },

  askFor: function () {
    var that = this;
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Happy Piggy!'));

    var subModules = utils.getSubModules();

    // 询问新页面放到哪个模块下
    var prompts = [
        {
            type: 'input',
            name: 'moduleName',
            message: 'Input your Module\'s name.'
        }
    ];

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      // 判断module是否已经存在
      if(~subModules.indexOf(this.moduleName)) {
          this.log.error('The Module already exists.');
      }

      done();
    }.bind(this));
  },

  files: function () {
    this.mkdir('src/html/' + this.moduleName);
    this.mkdir('src/js/page/' + this.moduleName);
    this.mkdir('src/css/' + this.moduleName);
    this.mkdir('src/img/' + this.moduleName);
  }
});

module.exports = ModuleGenerator;
