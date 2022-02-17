// 노래가 들어간 플레이리스트 검색
// 검색 버튼 눌렀을 때 onclick으로 이 함수 호출해주시면 될 거예요
function searchPlaylists() {
    let keyword = $('#songinfo').val()
    $.ajax({
        type: 'GET',
        url: '/search/playlists?keyword_give=' + keyword + '',
        success: function (response) {
            alert('검색!')
            let playlists = response['data']
            console.log(playlists)
            for (let i = 0; i < playlists.length; i++) {
                let playlist_title = playlists[i]["playlist_title"]
                let temp_html = `<tr>
                                                <td>${playlist_title}</td>
                                                <td></td>
                                                <td></td>
                                         </tr>`
                $('#list-q1').append(temp_html);
            }
            searchMusic()   // 일단은 플레이리스트 목록 뜨고 음악 목록 뜨도록 설정해뒀습니다 나중에 변경하시면 돼요!
        }
    })
}

// 음악 검색
function searchMusic() {
    let musicKeyWord = $('#songinfo').val()
    $.ajax({
        type: 'GET',
        url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + musicKeyWord + '&api_key=36e6ecdb6e67403d6448be2bca4e77ce&format=json',
        async: false,
        success: function (response) {
            alert("ajax success")
            let musicList = response["results"]["trackmatches"]["track"];
            for (let i = 0; i < musicList.length; i++) {
                let albumTitle = musicList[i]["name"]
                let albumArtist = musicList[i]["artist"]

                let temp_html = `<tr>
                                     <td>${albumTitle}</td>
                                     <td>${albumArtist}</td>
                                     <td><button onclick="addMusic('${playlist_title}','${title}','${artist}')">추가</button>
                                     </td>
                                </tr>`
                $('#list-q1').append(temp_html);
            }
        }
    })
}


// 노래 담을 플레이리스트 선택
function selectPlaylist(title, artist) {
    console.log(title, artist)
    $.ajax({
        type: 'GET',
        url: '/search/select',
        data: {},
        success: function (response) {
            alert('연결!')
            let myPlaylists = response['data']
            console.log(myPlaylists)
            console.log(title)
            for (let i = 0; i < myPlaylists.length; i++) {
                let playlist_title = myPlaylists[i]["playlist_title"]
                let temp_html = `<tr>
                                     <td>${playlist_title}</td>
                                     <td></td>
                                     <td><button onclick="addMusic('${playlist_title}','${title}','${artist}')">추가</button></td>
                                </tr>`
                $('#list-q1').append(temp_html);
            }
        }
    });
}

// 선택한 플레이리스트에 노래 추가
function addMusic(playlist, title, artist) {
    console.log(playlist, title, artist)
    $.ajax({
        type: 'POST',
        url: '/search/select/add',
        data: {playlist_give: playlist, title_give: title, artist_give: artist},
        success: function (response) {
            alert(response['msg']);
            window.location.reload()
        }
    });
}
