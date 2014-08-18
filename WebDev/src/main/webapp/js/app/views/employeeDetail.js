define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl		            = require('text!tpl/EmployeeDetail.html');
//        tpl2		        = require('text!tpl/EmployeeEdit.html');
    
    return Backbone.View.extend({

        template : _.template(tpl),
//    	template2 : _.template(tpl2),
    	initialize: function (options) {
        	console.log("employeeDetail initialize()");
        	
        	var self = this;
        	// 메모리에 데이터를 담아줘야 하지만 viewOption에서 자동으로 해주기 때문에 다른 메소드에서 사용 할 수 있다.
//        	this.model = options.model;
        	
        	// 이벤트 청취
        	// change event는 model.set 함수 호출시 발생
        	// destory event는 model.destroy 함수 호출시 발생 
        	self.listenTo(self.model, 'change', this.render);
        	self.listenTo(self.model, 'destroy', this.destroyed);
        	
        	// data 조회
        	self.model.fetch({
        		url:'employee/selectEmployee',
        		data:JSON.stringify({id:options.id})
        	});
        },
        
        events: {
            "click #EditBtn"   		: "employeeEditView",
            "click #DeleteBtn"   	: "destroy"
//            "click #SaveBtn"   		: "edit"
        },
        
        remove: function(){
        	console.log("override view remove");
        	$(this.$el).off("click", "#EditBtn");
        	$(this.$el).off("click", "#DeleteBtn");
        	$(this.$el).off("click", "#SaveBtn");
        	
        	this.$el.remove();
        	this.stopListening();
        	return this;
        },
        
        render: function () {
        	console.log("employeeDetail render() " + JSON.stringify(this.model.toJSON()) );
        	// 필수 데이터가 null일 경우는 이전 페이지로 넘긴다.
        	if(this.model.toJSON().id == null){
        		alert("데이터가 없습니다.");
        		return history.back();
        	}
        	this.$el.empty();
        	this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        employeeEditView: function(event){
        	location.hash="#employeeEdit/"+this.id;
//        	console.log("employeeDetail employeeEdit()");
//        	this.$el.empty();
//        	this.$el.append(this.template2(this.model.toJSON()));
//        	return this;
        },
        
//        edit: function(event){
//        	console.log("employeeDetail employeeEditSave()");
//			var con = confirm("수정 하시겠습니까?");
//			if(con){
//				this.model.save({
//                    id:$('#txtid').val(), 
//                    firstName:$('#txtFirstName').val(), 
//                    lastName:$('#txtLastName').val(), 
//                    title:$('#selTitle').val(), 
//                    managerName:$('#txtManagerName').val(), 
//                    managerId:$('#txtManagerId').val(), 
//                    officePhone:$('#txtOfficePhone').val(), 
//                    cellPhone:$('#txtCellPhone').val(), 
//                    city:$('#txtCity').val(), 
//                    email:$('#txtEmail').val(), 
//                    twitterId:$('#txtTwitter').val(), 
//                    pic:$('#imgName').val(), 
//                    blog:$('#txtBlog').val()
//                }, 
//                {
//                	wait:true, 
//                	silent:true,
//                	success:function(model, resp, options){
//                		console.log("강제 이벤트 발생");
        				// 성공 했을 때 무조건 발생 
//                		model.trigger("change");
//                	},
//                	error:function(model, resp, options){alert(resp);}
//                });
//			}
//        },
        
        destroy: function(event){
        	console.log("employeeDetail employeeDelete()");
        	var con = confirm("삭제 하시겠습니까?");
        	if(con){
        		this.model.destroy({
        			url:'employee/deleteEmployee',
        			data:JSON.stringify({id:this.model.get("id")}),
        		});
        	}
        },
        
        destroyed: function(){
//        	location.hash="#employees";
        	Backbone.pageMove.employees();
        }
    });
});