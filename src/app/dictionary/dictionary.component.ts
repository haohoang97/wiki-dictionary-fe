import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MainServiceService } from '../service/main-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'wk-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {
  myControl = new FormControl();
  listWord: any;
  options: string[] = [];
  listSearch: Observable<string[]>;
  searchValue: string;
  searchResult: string;
  languageFrom: any;
  languageTo: any;
  languageTexts = [`Việt Nam`,`Acèh` ,`Адыгабзэ` ,`Afrikaans` ,`Akan` ,`Alemannisch` ,`አማርኛ` ,`Ænglisc` ,`Аҧсшәа` ,`العربية` ,`Aragonés` ,`ܐܪܡܝܐ` ,`Արեւմտահայերէն` ,`Armãneashti` ,`Arpetan` ,`অসমীয়া` ,`Asturianu` ,`Atikamekw` ,`अवधी` ,`Avañe'ẽ` ,`Авар` ,`Aymar aru` ,`Azərbaycanca` ,`تۆرکجه` ,`Bahasa Hulontalo` ,`Bahasa Indonesia` ,`Bahasa Melayu` ,`Basa Bali` ,`Bamanankan` ,`বাংলা` ,`Banjar` ,`Bân-lâm-gú` ,`Basa Banyumasan` ,`Башҡортса` ,`Беларуская` ,`Беларуская (тарашкевіца)‎` ,`भोजपुरी` ,`Bikol Central` ,`Bislama` ,`Boarisch` ,`བོད་ཡིག` ,`Bosanski` ,`Brezhoneg` ,`ᨅᨔ ᨕᨘᨁᨗ` ,`Български` ,`Буряад` ,`Català` ,`Cebuano` ,`Чӑвашла` ,`Čeština` ,`Chamoru` ,`Chavacano de Zamboanga` ,`Chi-Chewa` ,`ChiShona` ,`Corsu` ,`Cymraeg` ,`Dansk` ,`الدارجة` ,`Davvisámegiella` ,`Deitsch` ,`Deutsch` ,`ދިވެހިބަސް` ,`Dolnoserbski` ,`Dorerin Naoero` ,`डोटेली` ,`Eesti` ,`Ελληνικά` ,`Emiliàn e rumagnòl` ,`English` ,`Эрзянь` ,`Español` ,`Esperanto` ,`Estremeñu` ,`Euskara` ,`فارسی` ,`Føroyskt` ,`Français` ,`Frysk` ,`Fulfulde` ,`Furlan` ,`Gaeilge` ,`Gaelg` ,`Gagana Samoa` ,`Gagauz` ,`Gàidhlig` ,`Galego` ,`ГӀалгӀай` ,`贛語` ,`Gĩkũyũ` ,`گیلکی` ,`ગુજરાતી` ,`𐌲𐌿𐍄𐌹𐍃𐌺` ,`गोंयची कोंकणी / Gõychi Konknni` ,`客家語/Hak-kâ-ngî` ,`Хальмг` ,`한국어` ,`Hausa` ,`Hawaiʻi` ,`Հայերեն` ,`हिन्दी` ,`Hornjoserbsce` ,`Hrvatski` ,`Ido` ,`Igbo` ,`Ilokano` ,`বিষ্ণুপ্রিয়া মণিপুরী` ,`Interlingua` ,`Interlingue` ,`ᐃᓄᒃᑎᑐᑦ/inuktitut` ,`Iñupiak` ,`Ирон` ,`IsiXhosa` ,`IsiZulu` ,`Íslenska` ,`Italiano` ,`עברית` ,`Jawa` ,`Kabɩyɛ` ,`Kalaallisut` ,`ಕನ್ನಡ` ,`Kapampangan` ,`Къарачай-малкъар` ,`ქართული` ,`कॉशुर / کٲشُر` ,`Kaszëbsczi` ,`Қазақша` ,`Kernowek` ,`Кыргызча` ,`Кырык мары` ,`Kiswahili` ,`Kreyòl ayisyen` ,`Kriyòl gwiyannen` ,`Kurdî` ,`Ladin` ,`Ladino` ,`Лакку` ,`ລາວ` ,`Latina` ,`لۊری شومالی` ,`Latgaļu` ,`Latviešu` ,`Lëtzebuergesch` ,`Лезги` ,`Lietuvių` ,`Ligure` ,`Limburgs` ,`Lingála` ,`Lingua Franca Nova` ,`Livvinkarjala` ,`La .lojban.` ,`Luganda` ,`Lumbaart` ,`Magyar` ,`मैथिली` ,`Македонски` ,`Malagasy` ,`മലയാളം` ,`Malti` ,`Māori` ,`मराठी` ,`მარგალური` ,`مصرى` ,`مازِرونی` ,`Minangkabau` ,`Mìng-dĕ̤ng-ngṳ̄` ,`Mirandés` ,`Мокшень` ,`Монгол` ,`မြန်မာဘာသာ` ,`Nāhuatl` ,`Na Vosa Vakaviti` ,`Nederlands` ,`Nedersaksies` ,`नेपाली` ,`नेपाल भाषा` ,`日本語` ,`Napulitano` ,`Нохчийн` ,`Nordfriisk` ,`Norfuk / Pitkern` ,`Norsk bokmål` ,`Norsk nynorsk` ,`Nouormand` ,`Novial` ,`Occitan` ,`Олык марий` ,`ଓଡ଼ିଆ` ,`Oshiwambo` ,`Oʻzbekcha/ўзбекча` ,`ਪੰਜਾਬੀ` ,`पालि` ,`Pälzisch` ,`Pangasinan` ,`پنجابی` ,`Papiamentu` ,`پښتو` ,`Patois` ,`Перем Коми` ,`ភាសាខ្មែរ` ,`ၽႃႇသႃႇတႆး ` ,`ဘာသာ မန်` ,`Picard` ,`Piemontèis` ,`Plattdüütsch` ,`Polski` ,`Ποντιακά` ,`Português` ,`Qafár af` ,`Qaraqalpaqsha` ,`Qırımtatarca` ,`Reo tahiti` ,`Ripoarisch` ,`Română` ,`Romani čhib` ,`Rumantsch` ,`Runa Simi` ,`Русиньскый` ,`Русский` ,`Саха тыла` ,`Sakizaya` ,`संस्कृतम्` ,`Sängö` ,`ᱥᱟᱱᱛᱟᱲᱤ` ,`Sardu` ,`Scots` ,`Seeltersk` ,`Sesotho sa Leboa` ,`Setswana` ,`Shqip` ,`Sicilianu` ,`සිංහල` ,`Simple English` ,`سنڌي` ,`SiSwati` ,`Slovenčina` ,`Slovenščina` ,`Словѣньскъ / ⰔⰎⰑⰂⰡⰐⰠⰔⰍⰟ` ,`Ślůnski` ,`Soomaaliga` ,`کوردی` ,`Sranantongo` ,`Српски / srpski` ,`Srpskohrvatski / српскохрватски` ,`Sunda` ,`Suomi` ,`Svenska` ,`Tagalog` ,`தமிழ்` ,`Taqbaylit` ,`Tarandíne` ,`Татарча/tatarça` ,`తెలుగు` ,`Tetun` ,`ไทย` ,`ትግርኛ` ,`Тоҷикӣ` ,`Tok Pisin` ,`ᏣᎳᎩ` ,`Tsetsêhestâhese` ,`Tshivenda` ,`ತುಳು` ,`Türkçe` ,`Türkmençe` ,`Twi` ,`Тыва дыл` ,`Удмурт` ,`Українська` ,`اردو` ,`ئۇيغۇرچە / Uyghurche` ,`Vahcuengh` ,`Vèneto` ,`Vepsän kel’` ,`Volapük` ,`Võro` ,`Walon` ,`文言` ,`West-Vlams` ,`Winaray` ,`Wolof` ,`吴语` ,`Xitsonga` ,`ייִדיש` ,`Yorùbá` ,`粵語` ,`Zazaki` ,`Zeêuws` ,`Žemaitėška` ,`中文`];
  languages = [];
  constructor(
    private service: MainServiceService
  ) {
    for(let i = 1; i <= this.languageTexts.length; i ++){
      var item = {
        ID: i,
        Text: this.languageTexts[i - 1]
      };
      this.languages.push(item);
    }
  }

  async ngOnInit(): Promise<void> {
    this.languageTo = this.languages[0];
    this.languageFrom = this.languages[0];

    this.listWord = await this.service.getAllWord();
    this.options = this.listWord.map(w => w.word);
    this.listSearch = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  public async submit() {
    // const result = await this.service.getWordByLanguage(this.languageFrom, this.languageTo, this.searchValue);
    const data = {
      LanguageFrom: this.languageFrom,
      LanguageTo: this.languageTo,
      Value: this.searchValue
    }
    const result = await this.service.getMultiLanguageByLanguage(data);
    this.searchResult = `${result[0].wordValue}`;
  }
}
