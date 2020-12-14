import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MainServiceService } from '../service/main-service.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { DialogDataExampleDialog } from '../common/dialog-data-example-dialog';

@Component({
  selector: 'wk-menu-component',
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.scss']
})

export class MenuComponentComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = [];
  listSearch: Observable<string[]>;
  searchValue: string;
  searchResult: any;
  files: any[];
  urlImg: any;
  languageFrom: any;
  languageTo: any;
  languageTexts = [`Việt Nam`,`Acèh` ,`Адыгабзэ` ,`Afrikaans` ,`Akan` ,`Alemannisch` ,`አማርኛ` ,`Ænglisc` ,`Аҧсшәа` ,`العربية` ,`Aragonés` ,`ܐܪܡܝܐ` ,`Արեւմտահայերէն` ,`Armãneashti` ,`Arpetan` ,`অসমীয়া` ,`Asturianu` ,`Atikamekw` ,`अवधी` ,`Avañe'ẽ` ,`Авар` ,`Aymar aru` ,`Azərbaycanca` ,`تۆرکجه` ,`Bahasa Hulontalo` ,`Bahasa Indonesia` ,`Bahasa Melayu` ,`Basa Bali` ,`Bamanankan` ,`বাংলা` ,`Banjar` ,`Bân-lâm-gú` ,`Basa Banyumasan` ,`Башҡортса` ,`Беларуская` ,`Беларуская (тарашкевіца)‎` ,`भोजपुरी` ,`Bikol Central` ,`Bislama` ,`Boarisch` ,`བོད་ཡིག` ,`Bosanski` ,`Brezhoneg` ,`ᨅᨔ ᨕᨘᨁᨗ` ,`Български` ,`Буряад` ,`Català` ,`Cebuano` ,`Чӑвашла` ,`Čeština` ,`Chamoru` ,`Chavacano de Zamboanga` ,`Chi-Chewa` ,`ChiShona` ,`Corsu` ,`Cymraeg` ,`Dansk` ,`الدارجة` ,`Davvisámegiella` ,`Deitsch` ,`Deutsch` ,`ދިވެހިބަސް` ,`Dolnoserbski` ,`Dorerin Naoero` ,`डोटेली` ,`Eesti` ,`Ελληνικά` ,`Emiliàn e rumagnòl` ,`English` ,`Эрзянь` ,`Español` ,`Esperanto` ,`Estremeñu` ,`Euskara` ,`فارسی` ,`Føroyskt` ,`Français` ,`Frysk` ,`Fulfulde` ,`Furlan` ,`Gaeilge` ,`Gaelg` ,`Gagana Samoa` ,`Gagauz` ,`Gàidhlig` ,`Galego` ,`ГӀалгӀай` ,`贛語` ,`Gĩkũyũ` ,`گیلکی` ,`ગુજરાતી` ,`𐌲𐌿𐍄𐌹𐍃𐌺` ,`गोंयची कोंकणी / Gõychi Konknni` ,`客家語/Hak-kâ-ngî` ,`Хальмг` ,`한국어` ,`Hausa` ,`Hawaiʻi` ,`Հայերեն` ,`हिन्दी` ,`Hornjoserbsce` ,`Hrvatski` ,`Ido` ,`Igbo` ,`Ilokano` ,`বিষ্ণুপ্রিয়া মণিপুরী` ,`Interlingua` ,`Interlingue` ,`ᐃᓄᒃᑎᑐᑦ/inuktitut` ,`Iñupiak` ,`Ирон` ,`IsiXhosa` ,`IsiZulu` ,`Íslenska` ,`Italiano` ,`עברית` ,`Jawa` ,`Kabɩyɛ` ,`Kalaallisut` ,`ಕನ್ನಡ` ,`Kapampangan` ,`Къарачай-малкъар` ,`ქართული` ,`कॉशुर / کٲشُر` ,`Kaszëbsczi` ,`Қазақша` ,`Kernowek` ,`Кыргызча` ,`Кырык мары` ,`Kiswahili` ,`Kreyòl ayisyen` ,`Kriyòl gwiyannen` ,`Kurdî` ,`Ladin` ,`Ladino` ,`Лакку` ,`ລາວ` ,`Latina` ,`لۊری شومالی` ,`Latgaļu` ,`Latviešu` ,`Lëtzebuergesch` ,`Лезги` ,`Lietuvių` ,`Ligure` ,`Limburgs` ,`Lingála` ,`Lingua Franca Nova` ,`Livvinkarjala` ,`La .lojban.` ,`Luganda` ,`Lumbaart` ,`Magyar` ,`मैथिली` ,`Македонски` ,`Malagasy` ,`മലയാളം` ,`Malti` ,`Māori` ,`मराठी` ,`მარგალური` ,`مصرى` ,`مازِرونی` ,`Minangkabau` ,`Mìng-dĕ̤ng-ngṳ̄` ,`Mirandés` ,`Мокшень` ,`Монгол` ,`မြန်မာဘာသာ` ,`Nāhuatl` ,`Na Vosa Vakaviti` ,`Nederlands` ,`Nedersaksies` ,`नेपाली` ,`नेपाल भाषा` ,`日本語` ,`Napulitano` ,`Нохчийн` ,`Nordfriisk` ,`Norfuk / Pitkern` ,`Norsk bokmål` ,`Norsk nynorsk` ,`Nouormand` ,`Novial` ,`Occitan` ,`Олык марий` ,`ଓଡ଼ିଆ` ,`Oshiwambo` ,`Oʻzbekcha/ўзбекча` ,`ਪੰਜਾਬੀ` ,`पालि` ,`Pälzisch` ,`Pangasinan` ,`پنجابی` ,`Papiamentu` ,`پښتو` ,`Patois` ,`Перем Коми` ,`ភាសាខ្មែរ` ,`ၽႃႇသႃႇတႆး ` ,`ဘာသာ မန်` ,`Picard` ,`Piemontèis` ,`Plattdüütsch` ,`Polski` ,`Ποντιακά` ,`Português` ,`Qafár af` ,`Qaraqalpaqsha` ,`Qırımtatarca` ,`Reo tahiti` ,`Ripoarisch` ,`Română` ,`Romani čhib` ,`Rumantsch` ,`Runa Simi` ,`Русиньскый` ,`Русский` ,`Саха тыла` ,`Sakizaya` ,`संस्कृतम्` ,`Sängö` ,`ᱥᱟᱱᱛᱟᱲᱤ` ,`Sardu` ,`Scots` ,`Seeltersk` ,`Sesotho sa Leboa` ,`Setswana` ,`Shqip` ,`Sicilianu` ,`සිංහල` ,`Simple English` ,`سنڌي` ,`SiSwati` ,`Slovenčina` ,`Slovenščina` ,`Словѣньскъ / ⰔⰎⰑⰂⰡⰐⰠⰔⰍⰟ` ,`Ślůnski` ,`Soomaaliga` ,`کوردی` ,`Sranantongo` ,`Српски / srpski` ,`Srpskohrvatski / српскохрватски` ,`Sunda` ,`Suomi` ,`Svenska` ,`Tagalog` ,`தமிழ்` ,`Taqbaylit` ,`Tarandíne` ,`Татарча/tatarça` ,`తెలుగు` ,`Tetun` ,`ไทย` ,`ትግርኛ` ,`Тоҷикӣ` ,`Tok Pisin` ,`ᏣᎳᎩ` ,`Tsetsêhestâhese` ,`Tshivenda` ,`ತುಳು` ,`Türkçe` ,`Türkmençe` ,`Twi` ,`Тыва дыл` ,`Удмурт` ,`Українська` ,`اردو` ,`ئۇيغۇرچە / Uyghurche` ,`Vahcuengh` ,`Vèneto` ,`Vepsän kel’` ,`Volapük` ,`Võro` ,`Walon` ,`文言` ,`West-Vlams` ,`Winaray` ,`Wolof` ,`吴语` ,`Xitsonga` ,`ייִדיש` ,`Yorùbá` ,`粵語` ,`Zazaki` ,`Zeêuws` ,`Žemaitėška` ,`中文`];
  languages = [];
  fromLanguages = [];
  toLanguages = [];
  isFindSame = false;
  isShowSwitch = false;

  isShowInputText = true;
  constructor(
    private service: MainServiceService,
    private route:Router,
    public dialog: MatDialog,
  ) {
    for(let i = 1; i <= this.languageTexts.length; i ++){
      var item = {
        ID: i,
        Text: this.languageTexts[i - 1]
      };
      this.languages.push(item);
      this.fromLanguages.push(item);
      this.toLanguages.push(item);
    }
    this.languageTo = "Multi language";
    this.languageFrom = "Auto detect";
    this.fromLanguages.unshift({
      ID: 0,
      Text: "Auto detect"
    });
    this.toLanguages.unshift({
      ID: 0,
      Text: "Multi language"
    });
  }

  ngOnInit() {
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

  public async submit(){
    if(this.isShowInputText){
      const data = {
        LanguageFrom: this.languageFrom != "Auto detect" ? this.languageFrom : null,
        LanguageTo: this.languageTo != "Multi language" ? this.languageTo : null,
        Value: this.searchValue
      }
      let result = {};
      if(this.isFindSame){
        result = await this.service.getMultiLanguageByLanguage(data);
      } else {
        result = await this.service.getMultiLanguage(data);
      }
      this.searchResult = result["Data"];
      if(this.languageFrom == "Auto detect" && result["LanguageFrom"]){
        this.languageFrom = result["LanguageFrom"];
      }
    } else {
      this.onUpload();
    }
    
  }

  public goToDictionary(){
    this.route.navigateByUrl('/dictionary');
  }

  public goToTranslateSentences(){
    this.route.navigateByUrl('/translateSentences');
  }

  onFileChanged(event: any) {
    this.files = event.target.files;
    if (this.files.length === 0)
        return;

    this.isShowInputText = false;
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
  
  public async onUpload() {
    let formData = new FormData();
    for (const file of this.files) {
        formData.append(name, file, file.name);
    }
    // const data = this.getDataUrl(this.files[0]);
    const img = document.querySelector('#img-element');
    const dataBase64 = this.getDataUrl(img);
    const data = {
      Value : dataBase64,
      LanguageFrom: this.languageFrom != "Auto detect" ? this.languageFrom : null,
      LanguageTo: this.languageTo != "Multi language" ? this.languageTo : null,
      IsFindSame: this.isFindSame.toString()
    }
    const result = await this.service.getMultiLanguageImg(data);
    this.searchResult = [];
    if(result && result[0]){
      this.searchResult = result[0]["Data"];
      if(this.languageFrom == "Auto detect" && result[0]["LanguageFrom"]){
        this.languageFrom = result[0]["LanguageFrom"];
      }
    }
  }

  getDataUrl(img) {
    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // Set width and height
    canvas.width = img.width || 200;
    canvas.height = img.height || 200;
    // Draw the image
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL('image/jpeg');
 }


  comboboxChange(e){
    if(this.languageFrom != 'Auto detect' && this.languageTo != 'Multi language'){
      this.isShowSwitch = true;
    } else {
      this.isShowSwitch = false;
    }
  }

  switchEvent(e){
    if(this.isShowSwitch){
      const swText = `${this.languageFrom}`;
      this.languageFrom = `${this.languageTo}`;
      this.languageTo = swText;
    }
  }

  removeImg(){
    this.isShowInputText = true;
    this.files = [];
    this.urlImg = null;
  }
}