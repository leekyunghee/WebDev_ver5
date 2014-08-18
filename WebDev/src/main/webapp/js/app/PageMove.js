define(function (require) {
	// 다른 무수한 페이지에서 쓰일 해시값을 여기에서 한번에 변경 해준다.
	return {
			"" : function(){location.href="";},
        	"login" : function(){location.href="#login";},
            "employees": function(){location.href="#employees";},
            "employee": function(id){location.href="#employee"+id;},
            "employeeAdd": function(){location.href="#employeeAdd";},
            "employeeEdit": function(id){location.href="#employeeEdit"+id;}
	};
    
});