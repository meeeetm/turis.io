var loadedResizeContainer=false;var resolutions=[1025,900,800,728,640,540,480,400,360,320,280];function setResulationContainer(element,resulation){var currentResulation=element.data('current-resulation');if(resulation==currentResulation){return;}
element.removeClass('broadage-responsive-'+currentResulation);currentResulation=resulation;element.data('current-resulation',resulation);element.addClass('broadage-responsive-'+currentResulation);}
function resizeContainer(){$('.broadage-widgets-body').each(function(){var element=$(this);var elementWidth=element.width();for(var i=0;i<resolutions.length;i++){if(elementWidth>resolutions[i]){setResulationContainer(element,resolutions[i]);return;}}});}
resizeContainer();$('.filterButtonContainer button').click(function(event){var iframe=$(this).attr("value");$(".filterButtonContainer button").removeClass('active');$(this).addClass('active');$(".filters-iframe").hide();$(".iframe_"+iframe).show();resizeContainer();});window.addEventListener("load",function(event){var el=document.getElementById('fixture-vue');if(el!==null){bindFixture();}
el=document.getElementById('point-vue');if(el!==null){bindPoint();}});var bindFixture=function(){window.VueComponent=window.VueComponent||{};window.VueComponent.Fixture=new Vue({el:'#fixture-vue',data:{loaderStatus:true,translate:{},fixture:[],currentWeek:1,scrollResizeTimeout:null,outerWeekElement:null,innerWeekElement:null,},created(){this.translate=Virtara.Locale.all();},computed:{currentFixture(){return this.fixture[(this.currentWeek-1)];}},mounted(){this.loadFixture();},methods:{loadComponents(){this.$nextTick(()=>{this.outerWeekElement=$('.broadage-fixture .broadage-nav-container');this.innerWeekElement=$('.broadage-fixture .broadage-nav-container > li');this.updateFixtureWeek();this.updateScrollFixtureWeek();$(window).resize(()=>{window.resizeContainer();if(this.scrollResizeTimeout){clearTimeout(this.scrollResizeTimeout);}
this.scrollResizeTimeout=setTimeout(()=>{this.updateScrollFixtureWeek();clearTimeout(this.scrollResizeTimeout);},100);});this.loaderStatus=false;});},loadFixture(){axios.get(Virtara.path+'/super-league/service/fixture').then(obj=>{if(obj.data.status&&obj.data.data.length){this.fixture=obj.data.data;this.fixture.sort(function(a,b){if(a.week<b.week){return-1;}
if(a.week>b.week){return 1;}
return 0;});this.loadComponents();this.$nextTick(()=>{let activeWeek=this.fixture.filter((fixture)=>{return fixture.week_active==1;});if(activeWeek.length&&activeWeek[0].week!=this.currentWeek){this.changeFixtureWeek(activeWeek[0].week);}});}})},changeFixtureWeek(week){if(week<1||week>this.innerWeekElement.length){return;}
this.currentWeek=week;this.updateFixtureWeek();this.updateScrollFixtureWeek();},updateFixtureWeek(){this.innerWeekElement.children().removeClass('broadage-current');$('.broadage-fixture .broadage-nav-holder a').removeClass('disabled');if(this.currentWeek==1){$('.broadage-fixture .broadage-nav-holder .broadage-nav-left').addClass('disabled');}
if(this.currentWeek==this.innerWeekElement.length){$('.broadage-fixture .broadage-nav-holder .broadage-nav-right').addClass('disabled');}
$(this.innerWeekElement[this.currentWeek-1]).children().addClass('broadage-current');},updateScrollFixtureWeek(){var outerWeekElementWidthHalf=(this.outerWeekElement.width()/2);var currentElementLeft=(this.innerWeekElement[(this.currentWeek-1)].offsetLeft+30);var scrollLeftPosition=0;if(currentElementLeft>outerWeekElementWidthHalf){scrollLeftPosition=currentElementLeft-outerWeekElementWidthHalf;}
this.outerWeekElement.animate({scrollLeft:scrollLeftPosition},100);}}});}
var bindPoint=function(){window.VueComponent=window.VueComponent||{};window.VueComponent.Point=new Vue({el:'#point-vue',data:{loaderStatus:true,translate:{},point:[],currentCategory:'common',categories:['common','in','out']},created(){this.translate=Virtara.Locale.all();},mounted(){this.loadPoint();},methods:{loadComponents(){this.$nextTick(()=>{if(!window.VueComponent.Fixture){$(window).resize(()=>{window.resizeContainer();});}
this.loaderStatus=false;});},loadPoint(){axios.get(Virtara.path+'/super-league/service/table').then(obj=>{if(obj.data.status){this.point=obj.data.data;this.loadComponents();}})}}});}