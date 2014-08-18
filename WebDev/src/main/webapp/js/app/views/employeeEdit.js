define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/EmployeeEdit.html');

    return Backbone.View.extend({

    	template : _.template(tpl),
    	
        initialize: function (options) {
        	console.log("employeeEdit initialize()");
        	var self = this;
        	
        	self.listenTo(self.model, 'change', this.render);
        	
        	self.model.fetch({
        		url:'employee/selectEmployee',
        		data:JSON.stringify({id:options.id})
        	});
        },
        
        events : {
        	"click #SaveBtn"   		: "edit"
        },
        remove: function(){
        	console.log("override view remove");
        	$(this.$el).off("click", "#edit");
        	
        	this.$el.remove();
        	this.stopListening();
        	return this;
        },
        
        render: function () {            
        	console.log("employeeEdit employeeEdit()");
        	this.$el.empty();
        	this.$el.append(this.template(this.model.toJSON()));
        	return this;
        },
        
        edit: function(event){
        	console.log("employeeDetail employeeEditSave()");
			var con = confirm("수정 하시겠습니까?");
			var self=this;
			if(con){
				this.model.save({
                    id:$('#txtid').val(), 
                    firstName:$('#txtFirstName').val(), 
                    lastName:$('#txtLastName').val(), 
                    title:$('#selTitle').val(), 
                    managerName:$('#txtManagerName').val(), 
                    managerId:$('#txtManagerId').val(), 
                    officePhone:$('#txtOfficePhone').val(), 
                    cellPhone:$('#txtCellPhone').val(), 
                    city:$('#txtCity').val(), 
                    email:$('#txtEmail').val(), 
                    twitterId:$('#txtTwitter').val(), 
                    pic:$('#imgName').val(), 
                    blog:$('#txtBlog').val()
                }, 
                {
                	wait:true, 
                	silent:true,   // trigger 이벤트가 발생 될때 까지 이벤트가 생기지 않는다. 
                	success:function(model, resp, options){
                		console.log("강제 이벤트 발생");
                		//model.trigger("change");		// 항상 강제로 이벤트를 발생 시킨다. 
                		Backbone.pageMove.employee(self.id);
                	},
                	error:function(model, resp, options){alert(resp);}
                });
			}
        }
    });

});