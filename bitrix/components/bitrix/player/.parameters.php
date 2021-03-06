<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
$type = $arCurrentValues["PLAYER_TYPE"] ? $arCurrentValues["PLAYER_TYPE"] : 'auto';
$type_ = $type;
$adv_mode = ($arCurrentValues["ADVANCED_MODE_SETTINGS"] == 'Y');
$hidden = ($adv_mode) ? "N" : "Y";

if (!function_exists('getSkinsEx'))
{
	function getSkinsEx($path)
	{
		$basePath = $_SERVER["DOCUMENT_ROOT"].Rel2Abs("/", $path);
		$arSkinExt = array('swf', 'zip');
		$arPreviewExt = array('png', 'gif', 'jpg', 'jpeg');
		$prExtCnt = count($arPreviewExt);

		$arSkins = Array();
		if (!is_dir($basePath)) // Not valid folder
			return $arSkins;

		$handle  = @opendir($basePath);
		while(false !== ($f = @readdir($handle)))
		{
			if($f == "." || $f == ".." || $f == ".htaccess" || !is_file($basePath.'/'.$f))
				continue;

			$ext = strtolower(GetFileExtension($f));
			if (in_array($ext, $arSkinExt)) // We find skin
			{
				$name = substr($f, 0, - strlen($ext) - 1); // name of the skin
				if (strlen($name) <= 0)
					continue;

				$Skin = array('filename' => $f);
				$Skin['name'] = strtoupper(substr($name, 0, 1)).strtolower(substr($name, 1));

				// Try to find preview
				for ($i = 0; $i < $prExtCnt; $i++)
				{
					if (file_exists(($basePath.'/'.$name.'.'.$arPreviewExt[$i])))
					{
						$Skin['preview'] = $name.'.'.$arPreviewExt[$i];
						break;
					}
				}
				$arSkins[] = $Skin;
			}
		}
		return $arSkins;
	}
}

$fp = $arCurrentValues["PATH"];
if ($type == 'auto' && strlen($fp) > 0 && strpos($fp, '.') !== false)
{
	$ext = strtolower(GetFileExtension($fp));
	$type = (in_array($ext, array('wmv', 'wma'))) ? 'wmv' : 'flv';
}

$arComponentParameters = array();
$arComponentParameters["GROUPS"] = array(
	"BASE_SETTINGS" => array("NAME" => GetMessage("PC_GROUP_BASE_SETTINGS"), "SORT" => "100"),
	"ADDITIONAL_SETTINGS" => array("NAME" => GetMessage("PC_GROUP_ADDITIONAL_SETTINGS"), "SORT" => "300")
);

if ($type == 'auto' && $adv_mode)
{
	$arComponentParameters["GROUPS"]["APPEARANCE"] = array(
		"NAME" => GetMessage("PC_GROUP_APPEARANCE_COMMON"),
		"SORT" => "140"
	);
	$arComponentParameters["GROUPS"]["PLAYBACK_FLV"] = array(
		"NAME" => GetMessage("PC_GROUP_PLAYBACK_FLV"),
		"SORT" => "210"
	);
}

if ($type == 'flv' || $type == 'auto')
{
	if ($adv_mode)
	{
		$arComponentParameters["GROUPS"]["APPEARANCE_FLV"] = array(
			"NAME" => ($type == 'auto') ? GetMessage("PC_GROUP_APPERANCE_FLV") : GetMessage("PC_GROUP_APPERANCE"),
			"SORT" => "150"
		);

		$arComponentParameters["GROUPS"]["ADDITIONAL_FLV"] = array(
			"NAME" => GetMessage("PC_GROUP_ADDITIONAL_FLV"),
			"SORT" => "220"
		);
	}
}

if ($type != 'flv')
{
	if ($adv_mode)
		$arComponentParameters["GROUPS"]["APPEARANCE_WMV"] = array(
			"NAME" => ($type == 'auto') ? GetMessage("PC_GROUP_APPERANCE_WMV") : GetMessage("PC_GROUP_APPERANCE"),
			"SORT" => "160"
		);

	$arComponentParameters["GROUPS"]["PLAYBACK"] = array(
		"NAME" => GetMessage("PC_GROUP_PLAYBACK"),
		"SORT" => "200"
	);
}

if ($type == 'flv')
{
	$arComponentParameters["GROUPS"]["PLAYBACK_FLV"] = array(
		"NAME" =>  GetMessage("PC_GROUP_PLAYBACK"),
		"SORT" => "210"
	);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
$arParams = array();
$arParams["PLAYER_TYPE"] = Array(
	"PARENT" => "BASE_SETTINGS",
	"NAME" => GetMessage("PC_PAR_PLAYER_TYPE"),
	"TYPE" => "LIST",
	"VALUES" => array(
		"auto" => GetMessage("PC_PAR_PLAYER_AUTODETECT"),
		"flv" => GetMessage("PC_PAR_PLAYER_FLV"),
		"wmv" => GetMessage("PC_PAR_PLAYER_WMV")
	),
	"DEFAULT" => $type,
	"REFRESH" => "Y",
	"HIDDEN" => $hidden,
);

$arParams["USE_PLAYLIST"] = Array(
	"PARENT" => "BASE_SETTINGS",
	"NAME" => GetMessage("PC_PAR_USE_PLAYLIST"),
	"TYPE" => "CHECKBOX",
	"DEFAULT" => "N",
	"REFRESH" => "Y",
	"HIDDEN" => $hidden,
);

if ($arCurrentValues["USE_PLAYLIST"] == 'Y')
	$ext = 'xml';
elseif($type == 'flv')
	$ext = 'flv,vp6,mp3,mp4,aac,jpg,jpeg,gif,png';
elseif($type == 'wmv')
	$ext = 'wmv,wma';
else
	$ext = 'wmv,wma,flv,vp6,mp3,mp4,aac,jpg,jpeg,gif,png';

$arParams["PATH"] = Array(
	"PARENT" => "BASE_SETTINGS",
	"NAME" => $arCurrentValues['USE_PLAYLIST'] != 'Y' ? GetMessage("PC_PAR_FILE_PATH") : GetMessage("PC_PAR_PLAYLIST_PATH"),
	"TYPE" => "FILE",
	"FD_TARGET" => "F",
	"FD_EXT" => $ext,
	"FD_UPLOAD" => true,
	"FD_USE_MEDIALIB" => true,
	"FD_MEDIALIB_TYPES" => Array('video', 'sound'),
	"DEFAULT" => "",
	"REFRESH" => "Y"
);

if ($arCurrentValues["USE_PLAYLIST"] == 'Y')
{
	$bPlaylistExists = strlen($arCurrentValues['PATH']) > 0 && file_exists($_SERVER["DOCUMENT_ROOT"].Rel2Abs("/", $arCurrentValues['PATH']));
	$butTitle = $bPlaylistExists ? GetMessage("PC_PAR_EDIT") : GetMessage("PC_PAR_CREATE");

	$arParams["PLAYLIST_DIALOG"] = Array(
		"PARENT" => "BASE_SETTINGS",
		"NAME" => GetMessage("PC_PAR_PLAYLIST_BUT"),
		"TYPE" => "CUSTOM",
		"JS_FILE" => "/bitrix/components/bitrix/player/js/prop_playlist_edit.js",
		"JS_EVENT" => "ComponentPropsEditPlaylistDialog",
		"JS_DATA" => $butTitle.'||'.GetMessage("ERROR_EMPTY_PATH"),
		"DEFAULT" => "",
		"HIDDEN" => $hidden,
	);
}

if ($type != 'wmv')
{
	$arParams["PROVIDER"] = Array(
		"PARENT" => "BASE_SETTINGS",
		"NAME" => GetMessage("PC_PAR_PROVIDER"),
		"TYPE" => "LIST",
		"VALUES" => array(
			"" => GetMessage("PC_PAR_PROVIDER_NONE"),
			"video" => GetMessage("PC_PAR_PROVIDER_VIDEO"),
			"http" => GetMessage("PC_PAR_PROVIDER_HTTP"),
			"rtmp" => GetMessage("PC_PAR_PROVIDER_RTMP"),
			"sound" => GetMessage("PC_PAR_PROVIDER_SOUND"),
			"image" => GetMessage("PC_PAR_PROVIDER_IMAGE"),
			"youtube" => GetMessage("PC_PAR_PROVIDER_YOUTUBE")
		),
		"ADDITIONAL_VALUES" => "Y",
		"DEFAULT" => "video",
		//"HIDDEN" => $hidden,
	);

	$arParams["STREAMER"] = Array(
		"PARENT" => "BASE_SETTINGS",
		"NAME" => GetMessage("PC_PAR_STREAMER"),
		"DEFAULT" => "",
		"HIDDEN" => $hidden,
	);
}

//if ($type_ == 'auto' && $adv_mode)
//	$arParams["PATH"]["REFRESH"] = "Y";

$arParams["WIDTH"] = Array(
	"PARENT" => "BASE_SETTINGS",
	"NAME" => GetMessage("PC_PAR_WIDTH"),
	"COLS" => 10,
	"DEFAULT" => 400,
);
$arParams["HEIGHT"] = Array(
	"PARENT" => "BASE_SETTINGS",
	"NAME" => GetMessage("PC_PAR_HEIGHT"),
	"COLS" => 10,
	"DEFAULT" => 300,
);
$arParams["PREVIEW"] = Array(
	"PARENT" => "BASE_SETTINGS",
	"NAME" => GetMessage("PC_PAR_PREVIEW_IMAGE"),
	"TYPE" => "FILE",
	"FD_TARGET" => "F",
	"FD_EXT" => "png,gif,jpg,jpeg",
	"FD_UPLOAD" => true,
	"FD_USE_MEDIALIB" => true,
	"FD_MEDIALIB_TYPES" => Array('image'),
	"DEFAULT" => '',
	"HIDDEN" => $hidden,
);

if ($arCurrentValues["USE_PLAYLIST"] != 'Y')
{
	$arParams["FILE_TITLE"] = Array(
		"PARENT" => "BASE_SETTINGS",
		"NAME" => GetMessage("PC_PAR_FILE_TITLE"),
		"COLS" => 40,
		"DEFAULT" => "",
		"HIDDEN" => $hidden
	);

	$arParams["FILE_DURATION"] = Array(
		"PARENT" => "BASE_SETTINGS",
		"NAME" => GetMessage("PC_PAR_FILE_DURATION"),
		"COLS" => 40,
		"DEFAULT" => "",
		"HIDDEN" => $hidden
	);

	$arParams["FILE_AUTHOR"] = Array(
		"PARENT" => "BASE_SETTINGS",
		"NAME" => GetMessage("PC_PAR_FILE_AUTHOR"),
		"COLS" => 40,
		"DEFAULT" => "",
		"HIDDEN" => $hidden
	);

	$arParams["FILE_DATE"] = Array(
		"PARENT" => "BASE_SETTINGS",
		"NAME" => GetMessage("PC_PAR_FILE_DATE"),
		"COLS" => 40,
		"DEFAULT" => "",
		"HIDDEN" => $hidden
	);

	$arParams["FILE_DESCRIPTION"] = Array(
		"PARENT" => "BASE_SETTINGS",
		"NAME" => GetMessage("PC_PAR_FILE_DESCRIPTION"),
		"COLS" => 40,
		"DEFAULT" => "",
		"HIDDEN" => $hidden
	);
}


//APPEARANCE   -FLV-
if ($type != 'wmv')
{
	$basePath = "/bitrix/components/bitrix/player/mediaplayer/skins";
	$arParams["SKIN_PATH"] = Array(
		"PARENT" => "APPEARANCE_FLV",
		"NAME" => GetMessage("PC_PAR_SKIN_PATH"),
		"TYPE" => "FILE",
		"FD_TARGET" => "D",
		"FD_UPLOAD" => false,
		"DEFAULT" => $basePath,
		"REFRESH" => "Y",
		"HIDDEN" => $hidden,
	);

	$arSkins = getSkinsEx($arCurrentValues['SKIN_PATH'] ? $arCurrentValues['SKIN_PATH'] : $basePath);
	
	//print_r($arSkins);

	$arParams["SKIN"] = Array(
		"PARENT" => "APPEARANCE_FLV",
		"NAME" => GetMessage("PC_PAR_SKIN"),
		"TYPE" => "CUSTOM",
		"JS_FILE" => "/bitrix/components/bitrix/player/js/prop_skin_selector.js",
		"JS_EVENT" => "ComponentPropsSkinSelector",
		"JS_DATA" => CUtil::PhpToJSObject(array($arSkins, array(
				'NoPreview' => GetMessage("PC_PAR_NO_PREVIEW")
			)
		)),
		"DEFAULT" => "",
		"HIDDEN" => $hidden,
	);

	$arParams["CONTROLBAR"] = Array(
		"PARENT" => "APPEARANCE_FLV",
		"NAME" => GetMessage("PC_PAR_CONTROLS"),
		"TYPE" => "LIST",
		"VALUES" => array(
			'bottom' => GetMessage("PC_PAR_CONTROLS_BOTTOM"),
			'over' => GetMessage("PC_PAR_CONTROLS_OVER"),
			'none' => GetMessage("PC_PAR_CONTROLS_NONE")
		),
		"DEFAULT" => "bottom",
		"HIDDEN" => $hidden,
	);
	$arParams["WMODE"] = Array(
		"PARENT" => "APPEARANCE_FLV",
		"NAME" => GetMessage("PC_PAR_WMODE"),
		"TYPE" => "LIST",
		"VALUES" => array(
			'window' => GetMessage("PC_PAR_WMODE_WINDOW"),
			'opaque' => GetMessage("PC_PAR_WMODE_OPAQUE"),
			'transparent' => GetMessage("PC_PAR_WMODE_TRANSPARENT")
		),
		"DEFAULT" => "transparent",
		"HIDDEN" => $hidden,
	);
	if ($arCurrentValues['USE_PLAYLIST'] == 'Y')
	{
		$arParams["PLAYLIST"] = Array(
			"PARENT" => "APPEARANCE_FLV",
			"NAME" => GetMessage("PC_PAR_PLAYLIST"),
			"TYPE" => "LIST",
			"VALUES" => array(
				'bottom' => GetMessage("PC_PAR_CONTROLS_BOTTOM"),
				//'over' => GetMessage("PC_PAR_CONTROLS_OVER"),
				'right' => GetMessage("PC_PAR_PLAYLIST_RIGHT"),
				'none' => GetMessage("PC_PAR_CONTROLS_NONE")
			),
			"DEFAULT" => "none",
			"HIDDEN" => $hidden,
		);
		$arParams["PLAYLIST_SIZE"] = Array(
			"PARENT" => "APPEARANCE_FLV",
			"NAME" => GetMessage("PC_PAR_PLAYLIST_SIZE"),
			"COLS" => 10,
			"DEFAULT" => "180",
			"HIDDEN" => $hidden,
		);
	}
	$arParams["HIDE_MENU"] = Array(
		"PARENT" => "APPEARANCE_FLV",
		"NAME" => GetMessage("PC_PAR_HIDE_MENU"),
		"TYPE" => "CHECKBOX",
		"DEFAULT" => "N",
		"HIDDEN" => $hidden,
	);
	$arParams["LOGO"] = Array(
		"PARENT" => "APPEARANCE_FLV",
		"NAME" => GetMessage("PC_PAR_LOGO"),
		"TYPE" => "FILE",
		"FD_TARGET" => "F",
		"FD_EXT" => "png,gif,jpg,jpeg",
		"FD_UPLOAD" => true,
		"FD_USE_MEDIALIB" => true,
		"FD_MEDIALIB_TYPES" => Array('image'),
		"DEFAULT" => "",
		"HIDDEN" => $hidden,
	);
	$arParams["LOGO_LINK"] = Array(
		"PARENT" => "APPEARANCE_FLV",
		"NAME" => GetMessage("PC_PAR_LOGO_LINK"),
		"DEFAULT" => "",
		"HIDDEN" => $hidden,
	);
	$arParams["LOGO_POSITION"] = Array(
		"PARENT" => "APPEARANCE_FLV",
		"NAME" => GetMessage("PC_PAR_LOGO_POSITION"),
		"TYPE" => "LIST",
		"VALUES" => array(
			'none' => GetMessage("PC_PAR_LOGO_POS_NONE"),
			'bottom-left' => GetMessage("PC_PAR_LOGO_POS_BOTTOM_LEFT"),
			'top-left' => GetMessage("PC_PAR_LOGO_POS_TOP_LEFT"),
			'top-right' => GetMessage("PC_PAR_LOGO_POS_TOP_RIGHT"),
			'bottom-right' => GetMessage("PC_PAR_LOGO_POS_BOTTOM_RIGHT")
		),
		"DEFAULT" => "none",
		"HIDDEN" => $hidden,
	);
	$addGroupPar = $type == 'auto' ? 'ADDITIONAL_FLV' : 'ADDITIONAL_SETTINGS';

	$arPluginList = array(
		'tweetit-1' => array(
			'name' => 'Tweet It',
			'flashvars' => array('tweetit.link' => '')
		),
		'fbit-1' => array(
			'name' => 'Facebook It',
			'flashvars' => array('fbit.link' => '')
		),
		'viral-2' => array(
			'name' => 'Viral',
			'flashvars' => array(
				'viral.onpause' => 'false',
				'viral.oncomplete' => 'true',
				'viral.allowmenu' => 'false',
				'viral.functions' => 'all',
				'viral.link' => '',
				'viral.email_subject' => 'text',
				'viral.email_footer' => 'text',
				'viral.embed' => ''
			)
		),
		'flow-1' => array(
			'name' => 'Flow',
			'flashvars' => array(
				'flow.coverheight' => '100',
				'flow.coverwidth' => '150'
			)
		),
		'gapro-1' => array(
			'name' => 'Google Analytics Pro',
			'flashvars' => array(
				'gapro.accountid' => 'UA-XXXXXXX-X',
				'gapro.trackstarts' => 'true',
				'gapro.trackpercentage' => 'true',
				'gapro.tracktime' => 'true'
			)
		),
		'drelated-1' => array(
			'name' => 'D-Related',
			'flashvars' => array()
		),
		'hd-1' => array(
			'name' => 'HD',
			'flashvars' => array()
		),
		'revolt-1' => array(
			'name' => 'Revolt',
			'flashvars' => array()
		),
		'yousearch-1' => array(
			'name' => 'YouSearch',
			'flashvars' => array()
		),
		'spectrumvisualizer-1' => array(
			'name' => 'Spectrum Visualizer'
		)
	);

	$arParams["PLUGINS"] = Array(
		"PARENT" => $addGroupPar,
		"NAME" => GetMessage("PC_PAR_PLUGINS"),
		"TYPE" => "LIST",
		"VALUES" => array(),
		"ADDITIONAL_VALUES" => "Y",
		"MULTIPLE"=> "Y",
		"DEFAULT" => array(),
		"REFRESH" => "Y",
		"HIDDEN" => $hidden
	);

	foreach ($arPluginList as $key => $arPlugin)
	{
		$arParams["PLUGINS"]["VALUES"][$key] = $arPlugin['name'];
		if ($arPlugin['default'])
			$arParams["PLUGINS"]["DEFAULT"][] = $key;
	}

	$arPlugins = isset($arCurrentValues['PLUGINS']) ? $arCurrentValues['PLUGINS'] : $arParams["PLUGINS"]["DEFAULT"];
	for ($j = 0, $n = count($arPlugins); $j < $n; $j++)
	{
		$pluginName = isset($arPluginList[$arPlugins[$j]]['name']) ? $arPluginList[$arPlugins[$j]]['name'] : trim($arPlugins[$j]);
		if (strlen($pluginName) <= 0)
			continue;

		$defValue = '';
		if (isset($arPluginList[$arPlugins[$j]]['flashvars']))
		{
			foreach ($arPluginList[$arPlugins[$j]]['flashvars'] as $varName => $varVal)
			{
				$defValue .= $varName.'='.$varVal."\n";
			}
		}

		$arParams["PLUGINS_".strtoupper(trim($arPlugins[$j]))] = Array(
			"PARENT" => $addGroupPar,
			"NAME" => GetMessage("PC_PAR_PLUGIN_NAME", array('#PLUGIN_NAME#' => $pluginName)),
			"ROWS" => 3,
			"COLS" => 50,
			"DEFAULT" => $defValue,
			"HIDDEN" => $hidden
		);
	}

	$arParams["ADDITIONAL_FLASHVARS"] = Array(
		"PARENT" => $addGroupPar,
		"NAME" => GetMessage("PC_PAR_ADDITIONAL_FLASHVARS"),
		"ROWS" => 3,
		"COLS" => 50,
		"DEFAULT" => "",
		"HIDDEN" => $hidden
	);
}

if ($type != 'flv')
{
	$arParams["WMODE_WMV"] = Array(
		"PARENT" => "APPEARANCE_WMV",
		"NAME" => GetMessage("PC_PAR_WMODE_WMV"),
		"TYPE" => "LIST",
		"VALUES" => array(
			'window' => GetMessage("PC_PAR_WMODE_WINDOW"),
			'windowless' => GetMessage("PC_PAR_WMODE_TRANSPARENT")
		),
		"DEFAULT" => "window",
		"HIDDEN" => $hidden,
	);

	$arParams["SHOW_CONTROLS"] = Array(
		"PARENT" => "APPEARANCE_WMV",
		"NAME" => GetMessage("PC_PAR_SHOW_CONTROLS"),
		"TYPE" => "CHECKBOX",
		"DEFAULT" => "Y",
		"REFRESH" => "Y",
		"HIDDEN" => $hidden,
	);
	if ($arCurrentValues['USE_PLAYLIST'] == 'Y')
	{
		$arParams["PLAYLIST"] = Array(
			"PARENT" => "APPEARANCE_WMV",
			"NAME" => GetMessage("PC_PAR_PLAYLIST"),
			"TYPE" => "LIST",
			"VALUES" => array(
				'bottom' => GetMessage("PC_PAR_CONTROLS_BOTTOM"),
				'right' => GetMessage("PC_PAR_PLAYLIST_RIGHT")
			),
			"DEFAULT" => "right",
			"HIDDEN" => $hidden,
		);
		$arParams["PLAYLIST_TYPE"] = Array(
			"PARENT" => "APPEARANCE_WMV",
			"NAME" => GetMessage("PC_PAR_PLAYLIST_TYPE"),
			"TYPE" => "LIST",
			"VALUES" => array(
				'asx' => 'ASX',
				'atom' => 'ATOM',
				'rss' => 'RSS',
				'xspf' => 'XSPF'
			),
			"DEFAULT" => "xspf",
			"HIDDEN" => $hidden,
		);
		$arParams["PLAYLIST_SIZE"] = Array(
			"PARENT" => "APPEARANCE_WMV",
			"NAME" => GetMessage("PC_PAR_PLAYLIST_SIZE"),
			"COLS" => 10,
			"DEFAULT" => "180",
			"HIDDEN" => $hidden,
		);
		$arParams["PLAYLIST_PREVIEW_WIDTH"] = Array(
			"PARENT" => "APPEARANCE_WMV",
			"NAME" => GetMessage("PC_PAR_PLAYLIST_PREVIEW_WIDTH"),
			"COLS" => 4,
			"DEFAULT" => "64",
			"HIDDEN" => $hidden,
		);
		$arParams["PLAYLIST_PREVIEW_HEIGHT"] = Array(
			"PARENT" => "APPEARANCE_WMV",
			"NAME" => GetMessage("PC_PAR_PLAYLIST_PREVIEW_HEIGHT"),
			"COLS" => 4,
			"DEFAULT" => "48",
			"HIDDEN" => $hidden,
		);
	}

	if ($arCurrentValues['SHOW_CONTROLS'] != 'N')
	{
		$arParams["SHOW_DIGITS"] = Array(
			"PARENT" => "APPEARANCE_WMV",
			"NAME" => GetMessage("PC_PAR_SHOW_DIGITS"),
			"TYPE" => "CHECKBOX",
			"DEFAULT" => "Y",
			"HIDDEN" => $hidden,
		);
		$arParams["CONTROLS_BGCOLOR"] = Array(
			"PARENT" => "APPEARANCE_WMV",
			"NAME" => GetMessage("PC_PAR_BGCOLOR"),
			"COLS" => 10,
			"DEFAULT" => "FFFFFF",
			//"TYPE" => "COLORPICKER",
			"HIDDEN" => $hidden,
		);
		$arParams["CONTROLS_COLOR"] = Array(
			"PARENT" => "APPEARANCE_WMV",
			"NAME" => GetMessage("PC_PAR_COLOR"),
			"COLS" => 10,
			"DEFAULT" => "000000",
			"HIDDEN" => $hidden,
		);
		$arParams["CONTROLS_OVER_COLOR"] = Array(
			"PARENT" => "APPEARANCE_WMV",
			"NAME" => GetMessage("PC_PAR_OVER_COLOR"),
			"COLS" => 10,
			"DEFAULT" => "000000",
			"HIDDEN" => $hidden,
		);
		$arParams["SCREEN_COLOR"] = Array(
			"PARENT" => "APPEARANCE_WMV",
			"NAME" => GetMessage("PC_PAR_SCREEN_COLOR"),
			"COLS" => 10,
			"DEFAULT" => "000000",
			"HIDDEN" => $hidden,
		);
	}
}

// PLAYBACK
$playback_parent = $type == 'flv' ? 'PLAYBACK_FLV' : 'PLAYBACK';
$arParams["AUTOSTART"] = Array(
	"PARENT" => $playback_parent,
	"NAME" => GetMessage("PC_PAR_AUTOSTART"),
	"TYPE" => "CHECKBOX",
	"DEFAULT" => "N"
);

$arParams["REPEAT"] = Array(
	"PARENT" => $playback_parent,
	"NAME" => GetMessage("PC_PAR_REPEAT"),
	"TYPE" => "LIST",
	"VALUES" => array(
		"none" => GetMessage("PC_PAR_REPEAT_NONE"),
		"list" => GetMessage("PC_PAR_REPEAT_LIST"),
		"always" => GetMessage("PC_PAR_REPEAT_ALWAYS"),
		"single" => GetMessage("PC_PAR_REPEAT_SINGLE")
	),
	"DEFAULT" => "N"
);

if ($type == 'wmv')
	$arParams["REPEAT"]["VALUES"] = array(
		"none" => GetMessage("PC_PAR_REPEAT_NONE"),
		"always" => GetMessage("PC_PAR_REPEAT_ALWAYS")
	);

$arParams["VOLUME"] = Array(
	"PARENT" => $playback_parent,
	"NAME" => GetMessage("PC_PAR_VOLUME"),
	"COLS" => 10,
	"DEFAULT" => "90"
);

if ($type != 'wmv')
{
	//$arParams["DISPLAY_CLICK"] = Array(
	//	"PARENT" => "PLAYBACK_FLV",
	//	"NAME" => GetMessage("PC_PAR_DISPLAY_CLICK"),
	//	"TYPE" => "LIST",
	//	"VALUES" => array(
	//		'play' => GetMessage("PC_PAR_DISPLAY_CLICK_PLAY"),
	//		'link' => GetMessage("PC_PAR_DISPLAY_CLICK_LINK"),
	//		'fullscreen' => GetMessage("PC_PAR_DISPLAY_CLICK_FULLSCREEN"),
	//		'none' => GetMessage("PC_PAR_DISPLAY_CLICK_NONE"),
	//		'mute' => GetMessage("PC_PAR_DISPLAY_CLICK_MUTE"),
	//		'next' => GetMessage("PC_PAR_DISPLAY_CLICK_NEXT"),
	//	),
	//	"DEFAULT" => 'play',
	//	"HIDDEN" => $hidden,
	//);

	$arParams["MUTE"] = Array(
		"PARENT" => "PLAYBACK_FLV",
		"NAME" => GetMessage("PC_PAR_MUTE"),
		"TYPE" => "CHECKBOX",
		"DEFAULT" => "N",
		"HIDDEN" => $hidden,
	);

	if ($arCurrentValues['USE_PLAYLIST'] == 'Y')
	{
		$arParams["SHUFFLE"] = Array(
			"PARENT" => "PLAYBACK_FLV",
			"NAME" => GetMessage("PC_PAR_SHUFFLE"),
			"TYPE" => "CHECKBOX",
			"DEFAULT" => "N",
			"HIDDEN" => $hidden,
		);
		$arParams["START_ITEM"] = Array(
			"PARENT" => "ADDITIONAL_SETTINGS",
			"NAME" => GetMessage("PC_PAR_START_FROM"),
			"TYPE" => "STRING",
			"DEFAULT" => "0",
			"HIDDEN" => $hidden,
		);
	}
}

//ADDITIONAL_SETTINGS
$arParams["ADVANCED_MODE_SETTINGS"] = Array(
	"PARENT" => "ADDITIONAL_SETTINGS",
	"NAME" => GetMessage("PC_PAR_ADVANCED_MODE"),
	"TYPE" => "CHECKBOX",
	"DEFAULT" => "N",
	"REFRESH" => "Y",
);

$arParams["PLAYER_ID"] = Array(
	"PARENT" => "ADDITIONAL_SETTINGS",
	"NAME" => GetMessage("PC_PAR_PLAYER_ID"),
	"DEFAULT" => "",
	"HIDDEN" => $hidden,
);

$arParams["BUFFER_LENGTH"] = Array(
	"PARENT" => "ADDITIONAL_SETTINGS",
	"NAME" => GetMessage("PC_PAR_BUFFER_LENGTH"),
	"COLS" => "10",
	"DEFAULT" => "10",
	"HIDDEN" => $hidden,
);

if ($type != 'flv')
{
	$arParams["DOWNLOAD_LINK"] = Array(
		"PARENT" => "ADDITIONAL_SETTINGS",
		"NAME" => GetMessage("PC_PAR_DOWNLOAD_LINK"),
		"COLS" => "40",
		"DEFAULT" => "",
		"HIDDEN" => $hidden,
	);
	$arParams["DOWNLOAD_LINK_TARGET"] = Array(
		"PARENT" => "ADDITIONAL_SETTINGS",
		"NAME" => GetMessage("PC_PAR_LINK_TARGET"),
		"TYPE" => "LIST",
		"VALUES" => array(
			'_self' => GetMessage("PC_PAR_LINK_TARGET_SELF"),
			'_blank' => GetMessage("PC_PAR_LINK_TARGET_BLANK")
		),
		"DEFAULT" => '_self',
		"HIDDEN" => $hidden,
	);

	$arParams["ADDITIONAL_WMVVARS"] = Array(
		"PARENT" => "ADDITIONAL_SETTINGS",
		"NAME" => GetMessage("PC_PAR_ADDITIONAL_WMVVARS"),
		"ROWS" => 3,
		"COLS" => 50,
		"DEFAULT" => "",
		"HIDDEN" => $hidden
	);
}

if ($type != 'wmv')
{
	$arParams["ALLOW_SWF"] = Array(
		"PARENT" => "ADDITIONAL_SETTINGS",
		"NAME" => GetMessage("PC_PAR_ALLOW_SWF"),
		"TYPE" => "CHECKBOX",
		"DEFAULT" => "N",
		"HIDDEN" => $hidden,
	);
}

$arComponentParameters["PARAMETERS"] = $arParams;
?>
