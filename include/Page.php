<?php

	class Page {
		public $db;
		public $id;
		
		function __construct(){
			//connects to db
			$this->db = new Database();
			
			try{
				$this->id = filter_input(INPUT_GET, "page", FILTER_SANITIZE_NUMBER_INT);
				if(!$this->id)
					throw new Exception(
						"Page ID is null either because it failed sanitization ".
						"or was never given: ".
						filter_input(INPUT_GET, "page", FILTER_SANITIZE_STRING)
					);
				else{
					//check if the content exists in the db
					$sql  = "SELECT * ".
						"FROM Page ".
						"WHERE kp_page_id={$this->id} ".
						"LIMIT 1";
					$this->db->query($sql);
					//Add fetched variables to class
					foreach ($this->db->get() as $k => $v)
						$this->{$k} = $v;
				}
			}
			catch(Exception $e){
				print_exception($e, "Query failed");
			}

			try{
				$this->display();
			}
			catch(Exception $e){
				print_exception($e, "Page not found");
			}
		}
		
		function __destruct(){
			//closes db connection
			$this->db = null;
		}

		function display(){
			include("include/head.php");
			if(!$this->kp_page_id)
				throw new Exception("Content wasn't found in database. Check query parameters or syntax.");
			else
				include("include/body.php");
		}

		function getAsset($type){
			$sql = "SELECT * ".
				"FROM Asset ".
				"WHERE type=\"{$type}\" AND " .
				"(kf_page_id=0 OR kf_page_id={$this->id}) ".
				"ORDER BY kf_page_id";
			$this->db->query($sql);
			$this->{$type} = array();
			while( $a = $this->db->get() )
				array_push($this->{$type}, $a);
		}
	}	
?>
