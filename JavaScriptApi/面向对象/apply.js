 // 创建一个全局的状态标示 - 当前是否处于类的构造阶段
 var initializing = false;

 function Person() {

   if (!initializing) {

     this.init.apply(this, arguments);

   }

 }

 Person.prototype = {

   init: function(name, age) {

     this.name = name;
     this.age = age;
   },

   getName: function() {

     return this.name;

   },
   getAge: function() {
     return this.age;
   }

 };

 function Employee() {

   if (initializing===false) {

     this.init.apply(this, arguments);

   }

 }

 // 标示当前进入类的创建阶段，不会调用init函数

 initializing = true;

 Employee.prototype = new Person();

 Employee.prototype.constructor = Employee;

 initializing = false;

 Employee.prototype.init = function(name, employeeID, age) {

   this.name = name;

   this.employeeID = employeeID;

   this.age = age;

 };

 Employee.prototype.getEmployeeID = function() {

   return this.employeeID;

 };

 // 初始化类实例时，自动调用类的原型函数init，并向init中传递参数

 var zhang = new Employee("ZhangSan", "1234", 25);

 console.info(zhang.getName()); // "ZhangSan"
 console.info(zhang.getEmployeeID());
 console.info(zhang.getAge());
