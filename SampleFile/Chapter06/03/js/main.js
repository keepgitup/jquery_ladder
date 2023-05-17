$(function () {

    /*
     * Gallery
     */
    $('#gallery').each(function () {

        var $container = $(this),
            $loadMoreButton = $('#load-more'), // ���[���s
            $filter = $('#gallery-filter'),    // �z�����
            addItemCount = 16,                 // �@����ܪ����ؼƶq
            addedd = 0,                        // ��ܵ��������ؼƶq
            allData = [],                      // ���㪺JSON���
            filteredData = [];                 // �z��᪺JSON���

        $container.masonry({
            columnWidth: 230,
            gutter: 10,
            itemSelector: '.gallery-item'
        });

        // ���oJSON�ð���initGallery���
        $.getJSON('./data/content.json', initGallery);

        // �Ϯw��l��
        function initGallery (data) {

            // �x�s���o��JSON���
            allData = data;

            // ��l���A��������z��
            filteredData = allData;

            // ��ܪ�l�����ظ��
            addItems();

            // �I���s�W���s�����
            $loadMoreButton.on('click', addItems);

            // �z�諸radio button���ܤƪ��ܫh����z��
            $filter.on('change', 'input[type="radio"]', filterItems);
        }

        // �إ߶��بô��J���
        function addItems (filter) {

            var elements = [],
                // �s�W��ƪ��}�C
                slicedData = filteredData.slice(addedd, addedd + addItemCount);

            // ��C��slicedDate�������إ�DOM����
            $.each(slicedData, function (i, item) {
                var itemHTML =
                        '<li class="gallery-item is-loading">' +
                            '<a href="' + item.images.large + '">' +
                                '<img src="' + item.images.thumb + '" alt="">' +
                                '<span class="caption">' +
                                    '<span class="inner">' +
                                        '<b class="title">' + item.title + '</b>' +
                                        '<time class="date" datatime="' + item.date + '">' +
                                            item.date.replace(/-0?/g, '/') +
                                        '</time>' +
                                    '</span>' +
                                '</span>' +
                            '</a>' +
                        '</li>';
                elements.push($(itemHTML).get(0));
            });

            // �NDOM�����}�C���Jcontainer�A�ð���Masonry�t�m
            $container
                .append(elements)
                .imagesLoaded(function () {
                    $(elements).removeClass('is-loading');
                    $container.masonry('appended', elements);

                    // �z��᭫�s�t�m
                    if (filter) {
                        $container.masonry();
                    }
                });

            // �s�W�������s���ؼƥ�
            addedd += slicedData.length;

            // ��JSON������ƬҤw�g��ܮɡA���÷s�W���s
            if (addedd < filteredData.length) {
                $loadMoreButton.show();
            } else {
                $loadMoreButton.hide();
            }
        }

        // ���ؿz��
        function filterItems () {
            var key = $(this).val(), // �I�諸Radio Button���A��

                // �s�W�᪺Masonry����
                masonryItems = $container.masonry('getItemElements');

            // �R��Masonry����
            $container.masonry('remove', masonryItems);

            // ���s�]�w�z��᪺���ظ��
            // �P�[�J�����ظ�Ƽ�
            filteredData = [];
            addedd = 0;

            if (key === 'all') {
                // �p�G�O�I��all�A�h�x�s�Ҧ���JSON���
                filteredData = allData;
            } else {
                // all�H�~�����p�A�h���X�ŦX��Ȫ����
                filteredData = $.grep(allData, function (item) {
                    return item.category === key;
                });
            }

            // �[�J����
            addItems(true);
        }
    });

    // jQuery UI Button
    $('.filter-form input[type="radio"]').button({
        icons: {
            primary: 'icon-radio'
        }
    });

    // Resize page header
    $('.page-header').each(function () {
        var $header = $(this),
            headerHeight = $header.outerHeight(),
            headerPaddingTop = parseInt($header.css('paddingTop'), 10),
            headerPaddingBottom = parseInt($header.css('paddingBottom'), 10);
        $(window).on('scroll', $.throttle(1000 / 60, function () {
            var scroll = $(this).scrollTop(),
                styles = {};
            if (scroll > 0) {
                if (scroll < headerHeight) {
                    styles = {
                        paddingTop: headerPaddingTop - scroll / 2,
                        paddingBottom: headerPaddingBottom - scroll / 2
                    };
                } else {
                    styles = {
                        paddingTop: 0,
                        paddingBottom: 0
                    };
                }
            } else {
                styles = {
                    paddingTop: '',
                    paddingBottom: ''
                }
            }
            $header.css(styles);
        }));
    });

});
                                                                                                                                                                                                            