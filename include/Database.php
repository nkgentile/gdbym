<?php  
require_once("functions.php");

class Database {
  	public $handler;
  	public $result;
  	
  	function __construct(){
		try{
  			$this->connect();
		}
		catch(Exception $e){
			print_exception($e, "Couldn't connect to database");
		}
  	}
  	
  	function __destruct(){
		try{
  			$this->disconnect();
		}
		catch(Exception $e){
			print_exception($e, "Couldn't disconnect from database");
		}
  	}
  	
  	function connect(){
  		$host = "";
  		$usr = "";
  		$pass = "";
  		$name = $usr;
  	 
  		try {
    			$this->handler = new PDO("mysql:host={$host};dbname={$name};", $usr, $pass);
    			$this->handler->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    		}
		catch(PDOException $e) {
			throw new Exception(
				"Check database credentials:\n".
				var_dump($this->handler)
			);
   		}
  	}
    
    	function disconnect(){
		//What case would throw an exception?

  		$this->handler = null;
   	}
    
   	function query($sql){
    		try{
				if(!$this->result)
					throw new Exception(
						"Database didn't return a result to the submitted query. ".
						"Check MySQL syntax or query parameters for errors:\n".
						$sql
					);
				else
					$this->result = $this->handler->query($sql);
    		}
    		catch(Exception $e){
    			print_exception($e, "Query failed");	
			print_exception(new Exception($sql), "SQL");
    		}
   	 }
    
    function get(){
	if(!$this->result)
		throw new Exception(
			"Can\'t get objects from database because original query did not return a result."
		);
    	try {
    		return $this->result->fetch(PDO::FETCH_OBJ);
    	}
    	catch(PDOException $e){
		print_exception($e, "Query coudn't fetch a result");
    	}
    }
  }
?>
