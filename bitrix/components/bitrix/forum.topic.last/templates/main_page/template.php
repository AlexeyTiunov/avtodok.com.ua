<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<?
?>
<div class="bx-new-layout-include">
<?
foreach ($arResult["TOPIC"] as $res)
{
	?>
	<div class="frm-mp-info">
		<div class="frm-mp-info-inner">
			<div class="frm-mp-date intranet-date"><?echo $res["LAST_POST_DATE"];?></div>
			<div class="frm-mp-post"><a href="<?=$res["read"]?>"><?echo $res["TITLE"]?></a></div>		
			<?
			if(IntVal($res["VIEWS"]) > 0)
			{
				?><div class="frm-mp-post"><?=GetMessage("FRM_MP_VIEWS")?> <?=$res["VIEWS"]?></div><?
			}
			if(IntVal($res["POSTS"]) > 0)
			{
				?><div class="frm-mp-post"><?=GetMessage("FRM_MP_POSTS")?> <?=$res["POSTS"]?></div><?
			}
			?>
			<div class="bx-users-delimiter"></div>
		</div>
	</div>
	<?
}
?>	
</div>