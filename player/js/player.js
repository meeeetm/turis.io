var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '.' + mm + '.' + yyyy;


        $(document).ready(function() {
            $('.date span').text(today); 
        });
        function list(){$.ajax({url:"",success:function(t){$("#eventlist").empty().append(t)}}),$(".SportSelect").removeClass("activeSelect"),$(".hepsi").addClass("activeSelect")}$(document).ready(function(){list(),setInterval(list,6e4),$("body").on("click","a.eventClick",function(){var t=$(this).attr("dataId"),e=$(this).attr("dataName");$("#title>span").html(e),player.configure({source:"https://volestream.calmakardesim.site/hls/"+t+".m3u8"})})});