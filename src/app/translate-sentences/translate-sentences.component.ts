import { Word } from './../model/words';
import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../service/main-service.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'wk-translate-sentences',
  templateUrl: './translate-sentences.component.html',
  styleUrls: ['./translate-sentences.component.scss']
})
export class TranslateSentencesComponent implements OnInit {
  searchResult: any;
  searchValue: string;
  files: any[];
  urlImg: any;
  languageFrom: any;
  languageTo: any;
  languageTexts = [`Việt Nam`,`Acèh` ,`Адыгабзэ` ,`Afrikaans` ,`Akan` ,`Alemannisch` ,`አማርኛ` ,`Ænglisc` ,`Аҧсшәа` ,`العربية` ,`Aragonés` ,`ܐܪܡܝܐ` ,`Արեւմտահայերէն` ,`Armãneashti` ,`Arpetan` ,`অসমীয়া` ,`Asturianu` ,`Atikamekw` ,`अवधी` ,`Avañe'ẽ` ,`Авар` ,`Aymar aru` ,`Azərbaycanca` ,`تۆرکجه` ,`Bahasa Hulontalo` ,`Bahasa Indonesia` ,`Bahasa Melayu` ,`Basa Bali` ,`Bamanankan` ,`বাংলা` ,`Banjar` ,`Bân-lâm-gú` ,`Basa Banyumasan` ,`Башҡортса` ,`Беларуская` ,`Беларуская (тарашкевіца)‎` ,`भोजपुरी` ,`Bikol Central` ,`Bislama` ,`Boarisch` ,`བོད་ཡིག` ,`Bosanski` ,`Brezhoneg` ,`ᨅᨔ ᨕᨘᨁᨗ` ,`Български` ,`Буряад` ,`Català` ,`Cebuano` ,`Чӑвашла` ,`Čeština` ,`Chamoru` ,`Chavacano de Zamboanga` ,`Chi-Chewa` ,`ChiShona` ,`Corsu` ,`Cymraeg` ,`Dansk` ,`الدارجة` ,`Davvisámegiella` ,`Deitsch` ,`Deutsch` ,`ދިވެހިބަސް` ,`Dolnoserbski` ,`Dorerin Naoero` ,`डोटेली` ,`Eesti` ,`Ελληνικά` ,`Emiliàn e rumagnòl` ,`English` ,`Эрзянь` ,`Español` ,`Esperanto` ,`Estremeñu` ,`Euskara` ,`فارسی` ,`Føroyskt` ,`Français` ,`Frysk` ,`Fulfulde` ,`Furlan` ,`Gaeilge` ,`Gaelg` ,`Gagana Samoa` ,`Gagauz` ,`Gàidhlig` ,`Galego` ,`ГӀалгӀай` ,`贛語` ,`Gĩkũyũ` ,`گیلکی` ,`ગુજરાતી` ,`𐌲𐌿𐍄𐌹𐍃𐌺` ,`गोंयची कोंकणी / Gõychi Konknni` ,`客家語/Hak-kâ-ngî` ,`Хальмг` ,`한국어` ,`Hausa` ,`Hawaiʻi` ,`Հայերեն` ,`हिन्दी` ,`Hornjoserbsce` ,`Hrvatski` ,`Ido` ,`Igbo` ,`Ilokano` ,`বিষ্ণুপ্রিয়া মণিপুরী` ,`Interlingua` ,`Interlingue` ,`ᐃᓄᒃᑎᑐᑦ/inuktitut` ,`Iñupiak` ,`Ирон` ,`IsiXhosa` ,`IsiZulu` ,`Íslenska` ,`Italiano` ,`עברית` ,`Jawa` ,`Kabɩyɛ` ,`Kalaallisut` ,`ಕನ್ನಡ` ,`Kapampangan` ,`Къарачай-малкъар` ,`ქართული` ,`कॉशुर / کٲشُر` ,`Kaszëbsczi` ,`Қазақша` ,`Kernowek` ,`Кыргызча` ,`Кырык мары` ,`Kiswahili` ,`Kreyòl ayisyen` ,`Kriyòl gwiyannen` ,`Kurdî` ,`Ladin` ,`Ladino` ,`Лакку` ,`ລາວ` ,`Latina` ,`لۊری شومالی` ,`Latgaļu` ,`Latviešu` ,`Lëtzebuergesch` ,`Лезги` ,`Lietuvių` ,`Ligure` ,`Limburgs` ,`Lingála` ,`Lingua Franca Nova` ,`Livvinkarjala` ,`La .lojban.` ,`Luganda` ,`Lumbaart` ,`Magyar` ,`मैथिली` ,`Македонски` ,`Malagasy` ,`മലയാളം` ,`Malti` ,`Māori` ,`मराठी` ,`მარგალური` ,`مصرى` ,`مازِرونی` ,`Minangkabau` ,`Mìng-dĕ̤ng-ngṳ̄` ,`Mirandés` ,`Мокшень` ,`Монгол` ,`မြန်မာဘာသာ` ,`Nāhuatl` ,`Na Vosa Vakaviti` ,`Nederlands` ,`Nedersaksies` ,`नेपाली` ,`नेपाल भाषा` ,`日本語` ,`Napulitano` ,`Нохчийн` ,`Nordfriisk` ,`Norfuk / Pitkern` ,`Norsk bokmål` ,`Norsk nynorsk` ,`Nouormand` ,`Novial` ,`Occitan` ,`Олык марий` ,`ଓଡ଼ିଆ` ,`Oshiwambo` ,`Oʻzbekcha/ўзбекча` ,`ਪੰਜਾਬੀ` ,`पालि` ,`Pälzisch` ,`Pangasinan` ,`پنجابی` ,`Papiamentu` ,`پښتو` ,`Patois` ,`Перем Коми` ,`ភាសាខ្មែរ` ,`ၽႃႇသႃႇတႆး ` ,`ဘာသာ မန်` ,`Picard` ,`Piemontèis` ,`Plattdüütsch` ,`Polski` ,`Ποντιακά` ,`Português` ,`Qafár af` ,`Qaraqalpaqsha` ,`Qırımtatarca` ,`Reo tahiti` ,`Ripoarisch` ,`Română` ,`Romani čhib` ,`Rumantsch` ,`Runa Simi` ,`Русиньскый` ,`Русский` ,`Саха тыла` ,`Sakizaya` ,`संस्कृतम्` ,`Sängö` ,`ᱥᱟᱱᱛᱟᱲᱤ` ,`Sardu` ,`Scots` ,`Seeltersk` ,`Sesotho sa Leboa` ,`Setswana` ,`Shqip` ,`Sicilianu` ,`සිංහල` ,`Simple English` ,`سنڌي` ,`SiSwati` ,`Slovenčina` ,`Slovenščina` ,`Словѣньскъ / ⰔⰎⰑⰂⰡⰐⰠⰔⰍⰟ` ,`Ślůnski` ,`Soomaaliga` ,`کوردی` ,`Sranantongo` ,`Српски / srpski` ,`Srpskohrvatski / српскохрватски` ,`Sunda` ,`Suomi` ,`Svenska` ,`Tagalog` ,`தமிழ்` ,`Taqbaylit` ,`Tarandíne` ,`Татарча/tatarça` ,`తెలుగు` ,`Tetun` ,`ไทย` ,`ትግርኛ` ,`Тоҷикӣ` ,`Tok Pisin` ,`ᏣᎳᎩ` ,`Tsetsêhestâhese` ,`Tshivenda` ,`ತುಳು` ,`Türkçe` ,`Türkmençe` ,`Twi` ,`Тыва дыл` ,`Удмурт` ,`Українська` ,`اردو` ,`ئۇيغۇرچە / Uyghurche` ,`Vahcuengh` ,`Vèneto` ,`Vepsän kel’` ,`Volapük` ,`Võro` ,`Walon` ,`文言` ,`West-Vlams` ,`Winaray` ,`Wolof` ,`吴语` ,`Xitsonga` ,`ייִדיש` ,`Yorùbá` ,`粵語` ,`Zazaki` ,`Zeêuws` ,`Žemaitėška` ,`中文`];
  languages = [];
  options: string[] = [];
  listSearch: Observable<string[]>;
  constructor(private service: MainServiceService) {
    for(let i = 1; i <= this.languageTexts.length; i ++){
      var item = {
        ID: i,
        Text: this.languageTexts[i - 1]
      };
      this.languages.push(item);
    }
  }

  ngOnInit(): void {
    this.languageTo = this.languages[0];
    this.languageFrom = this.languages[0];
  }

  public async translate(language: string) {
    try {
      const str = language.split('-');
      this.searchResult = await this.service.getSentencesByLanguage(str[0], str[1], this.searchValue);
    } catch (error) {
      
    }
  }

  onFileChanged(event: any) {
    this.files = event.target.files;
    if (this.files.length === 0)
        return;

    const mimeType = this.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.files[0]); 
    reader.onload = (_event) => { 
        this.urlImg = reader.result; 
    }
  }
  
  onUpload() {
    let formData = new FormData();
    for (const file of this.files) {
        formData.append(name, file, file.name);
    }



    const data = btoa(this.files[0]);
    const result = this.service.getMultiLanguageImg(data);
  }
}
