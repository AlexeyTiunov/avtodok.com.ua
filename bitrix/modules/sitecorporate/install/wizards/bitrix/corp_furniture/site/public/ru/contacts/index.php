<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("��������");
?>
<p>���������� � ����� ������������ � �������� ���������������� ������������ �� �������� �������� � ������� ������ (�� �������, ���������� ������������ ������� �� �������� ������ � ��� �����).</p>

<p>�� ������ ���������� � ��� �� ��������, �� ����������� ����� ��� ������������ � ������� � ����� �����. ����� ���� ������ ��� � �������� �� ��� ���� �������. </p>

<h2>��������</h2>

<ul> 
	<li>�������/����:
		<ul> 
			<li><b>(495) 212-85-06</b></li>
		</ul>
	</li>
 
	<li>��������:
		<ul> 
			<li><b>(495) 212-85-07</b></li>
			<li><b>(495) 212-85-08</b></li>
		</ul>
	</li>
</ul>

<h2>Email</h2>

<ul> 
  <li><a href="mailto:info@example.ru">info@example.ru</a> &mdash; ����� �������</li>
  <li><a href="mailto:sales@example.ru">sales@example.ru</a> &mdash; ������������ ���������</li>
  <li><a href="mailto:marketing@example.ru">marketing@example.ru</a> &mdash; ���������/�����������/PR</li>
</ul>

<h2>���� � ������</h2>

<?
$APPLICATION->AddHeadString('<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false&language='.LANGUAGE_ID.'"></script>');
CUtil::InitJSCore();
?>
<script type="text/javascript">
BX.ready(function () 
{
	var point = new google.maps.LatLng(55.75318806139659, 37.60178098678589);
	var options = {
		zoom: 15,
		center: point,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(BX("map"), options);
	
	var marker = new google.maps.Marker({
		position: point, 
		map: map, 
		title:"��� ���������� ����"
	});   
});
</script>
<div id="map" style="width:600px; height:600px"></div>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>