<?php
	$sql = "SELECT * ".
		"FROM Page ".
		"ORDER BY position";
	$this->db->query($sql);
?>
<div class="wrapper inline">
	<h1 class="inline"><?php echo $GLOBALS["SITE_NAME_HTML"]; ?></h1>
	<nav class="inline">
	<?php while($n = $this->db->get()): ?>
		<a href="?page=<?php echo $n->kp_page_id; ?>">
		<?php echo $n->display_name; ?></a>
	<?php endwhile; ?>
	</nav>
</div>
