$(document).ready(function() {
  const apiRoot = 'https://sleepy-scrubland-36856.herokuapp.com/library/';
  const $title = $('[data-container-section]').find('[what-i-get]');
  const $container = $('[data-container]');
  const readersList = $('[readers-list]').children()[0];
  const titlesList = $('[titles-list]').children()[0];
  const piecesList = $('[pieces-list]').children()[0];
  const rentsList = $('[rents-list]').children()[0];
  

  $('[add-reader-show-form-button]').on('click', function() {
  	$title.text("");
    $container.empty();
    makeInvisible();
    $('[add-reader-form]').slideDown();
  })

  $('[add-title-show-form-button]').on('click', function() {
  	$title.text("");
    $container.empty();
    makeInvisible();
    $('[add-title-form]').slideDown();
  })

  $('[add-piece-show-form-button]').on('click', function() {
  	$title.text("");
    $container.empty();
    makeInvisible();
    $('[add-piece-form]').slideDown();
  })

  $('[rent-book-show-form-button]').on('click', function() {
  	$title.text("");
    $container.empty();
    makeInvisible();
    $('[rent-book-form]').slideDown();
  })

  $('[return-book-show-form-button]').on('click', function() {
  	$title.text("");
    $container.empty();
    makeInvisible();
    $('[return-book-form]').slideDown();
  })

  $('[change-status-show-form-button]').on('click', function() {
  	$title.text("");
    $container.empty();
    makeInvisible();
    $('[change-status-form]').slideDown();
  })

  $('[rental-pieces-show-form-button]').on('click', function() {
  	$title.text("");
    $container.empty();
    makeInvisible();
    $('[rental-piece-form]').slideDown();
  })

  $('[get-readers-button]').on('click', function() {
  	makeInvisible();
  });

  $('[get-title-button]').on('click', function() {
    makeInvisible();
  });

  $('[get-pieces-button]').on('click', function() {
  	makeInvisible();
  });

  $('[get-rentals-button]').on('click', function() {
  	makeInvisible();
  });

  function makeInvisible() {
  	$('[add-reader-form]').hide();
  	$('[add-title-form]').hide();
  	$('[add-piece-form]').hide();
  	$('[rent-book-form]').hide();
  	$('[return-book-form]').hide();
  	$('[change-status-form]').hide();
  	$('[rental-piece-form]').hide();

  }

  function createReader(reader) {
    const element = $(readersList).clone();

    element.attr('data-reader-id', reader.id);
    element.find('[data-reader-id-section] [data-reader-id-paragraph]').text(reader.readerId);
    element.find('[data-reader-name-section] [data-reader-name-paragraph]').text(reader.name);
    element.find('[data-reader-surname-section] [data-reader-surname-paragraph]').text(reader.surname);
    element.find('[data-reg-date-section] [data-reg-date-paragraph]').text(reader.regDate);

    return element;
  }

  function createTitle(title) {
    const element = $(titlesList).clone();

    var piecesContainer = $(element).find('[pieces-container]');

    element.attr('data-title-id', title.id);
    element.find('[data-title-id-section] [data-title-id-paragraph]').text(title.titleId);
    element.find('[data-title-section] [data-title-paragraph]').text(title.title);
    element.find('[data-author-section] [data-author-paragraph]').text(title.author);
    element.find('[data-publication-year-section] [data-publication-year-paragraph]').text(title.spendYear);

    title.pieces.forEach(function (piece) {
      var $datatableRowEl = createPiece(piece);

      $datatableRowEl.appendTo(piecesContainer);
    });


    return element;
  }

  function createPiece(piece) {
    const element = $(piecesList).clone();

    element.attr('data-piece-id', piece.id);
    element.find('[data-id-section] [data-id-paragraph]').text(piece.pieceId);
    element.find('[data-status-section] [data-status-paragraph]').text(piece.status);

    return element;
  }


  function createRent(rent) {
    const element = $(rentsList).clone();

    element.attr('data-rent-id', rent.id);
    element.find('[data-rental-id-section] [data-rental-id-paragraph]').text(rent.rentalId);
    element.find('[data-name-of-book-section] [data-name-of-book-paragraph]').text(rent.nameOfBook);
    element.find('[data-reader-surname-section] [data-reader-surname-paragraph]').text(rent.readerSurname);
    element.find('[data-rent-date-section] [data-rent-date-paragraph]').text(rent.rentDate);
    element.find('[data-return-date-section] [data-return-date-paragraph]').text(rent.returnDate);


    return element;
  }

  function createBoardOfReaders(readers) {
    $container.empty();
    
    $('[what-i-get]').text("READERS FROM DATABASE");

    readers.forEach(function(reader) {
      var $datatableRowEl = createReader(reader);

      $datatableRowEl
        .appendTo($container);
    });
  }

  function createBoardOfPieces(pieces) {
    
    pieces.forEach(function(piece) {
      var $datatableRowEl = createPiece(piece);

      $datatableRowEl
        .appendTo($piecesContainer);
    });
  }

  function createBoardOfOnlyPieces(pieces) {
    $container.empty();

    $('[what-i-get]').text("PIECES FROM DATABASE");

    pieces.forEach(function(piece) {
      var $datatableRowEl = createPiece(piece);

      $datatableRowEl
        .appendTo($container);
    });
  }

  function createBoardOfTitles(titles) {
    $container.empty();
    
    $('[what-i-get]').text("TITLES FROM DATABASE");


    titles.forEach(function(title) {
      var $datatableRowEl = createTitle(title);

      $datatableRowEl
        .appendTo($container);
    });
  }

  function createBoardOfRents(rentals) {
    $container.empty();

    $('[what-i-get]').text("RENTALS FROM DATABASE");

    
    rentals.forEach(function(rent) {
      var $datatableRowEl = createRent(rent);

      $datatableRowEl
        .appendTo($container);
    });
  }
 
  function handleReaderSubmitRequest(event) { 
    event.preventDefault();                                             
  
    var readerName = $(this).find('[name="firstname"]').val();
    var readerSurname = $(this).find('[name="lastname"]').val(); 

    var requestUrl = apiRoot + 'addReader';

    $.ajax({
      url: requestUrl,
      method: 'POST',
      processData: false,
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      data: JSON.stringify({
        name: readerName,
        surname: readerSurname
      }),
      success: function(readers) {
        createBoardOfReaders(readers);
      }
    });
    }

    function handlePieceSubmitRequest(event) {
    event.preventDefault();                                             
  
    var title = $(this).find('[name="title"]').val();

    var requestUrl = apiRoot + 'addPiece';

    $.ajax({
      url: requestUrl,
      method: 'POST',
      data: {
        "title": title,
      },
      success: function(title) {
        createTitle(title).appendTo($container);
      }
    });
    }



  function handleTitleSubmitRequest(event) {
    event.preventDefault();

    var title = $(this).find('[name="title"]').val();               
    var author = $(this).find('[name="author"]').val();
    var publication = $(this).find('[name="publication"]').val(); 

    var requestUrl = apiRoot + 'addTitle';

    $.ajax({
      url: requestUrl,
      method: 'POST',
      processData: false,
      contentType: "application/json; chaset=utf-8",
      dataType: 'json',
      data: JSON.stringify({
        title: title,
        author: author,
        spendYear: publication
      }),
      success: function(titles) {
        createBoardOfTitles(titles);
      }
    });
  }

  function handleRentSubmitRequest(event) {
    event.preventDefault();

    var piece_id = $(this).find('[name="piece id"]').val();               
    var reader_id = $(this).find('[name="reader id"]').val();

    var requestUrl = apiRoot + 'rentBook';

    $.ajax({
      url: requestUrl,
      method: 'POST',
      processData: false,
      contentType: "application/json; chaset=utf-8",
      dataType: 'json',
      data: JSON.stringify({
        pieceId: piece_id,
        readerId: reader_id
      }),
      success: function(rentals) {
        createBoardOfRents(rentals);
      }
    });
  }

  function handleReturnUpdateRequest(event) {
    event.preventDefault();

    var rental_id = $(this).find('[name="rental id"]').val();               
    var requestUrl = apiRoot + 'returnBook';

    $.ajax({
      url: requestUrl,
      method: 'PUT',
      data: {
        "id": rental_id
      },
      success: function(rental) {
        createRent(rental).appendTo($container);
      }
    });
  }

  function handlePieceUpdateRequest(event) {
    event.preventDefault();

    var piece_id = $(this).find('[name="piece id"]').val();
    var status = $(this).find('[name="status"]').val();               
               
    var requestUrl = apiRoot + 'changePieceStatus';

    $.ajax({
      url: requestUrl,
      method: 'PUT',
      data: {
        "id": piece_id,
        "status": status
      },
      success: function(piece) {
        createPiece(piece).appendTo($container);
      }
    });
  }

  function handleRentalPiecesGetRequest(event) {
    event.preventDefault();

    var title = $(this).find('[name="title"]').val();
               
    var requestUrl = apiRoot + 'getRentalPiecesOfTitle';

    $.ajax({
      url: requestUrl,
      method: 'GET',
      data: {
        "title": title,
      },
      success: function(value) {
        $('[what-i-get]').text("RENTAL PIECES OF THIS TITLE");
        $($container).append(value);
      }
    });
  }

  function handleReadersGetRequest() {
    event.preventDefault();

               
    var requestUrl = apiRoot + 'getAllReaders';

    $.ajax({
      url: requestUrl,
      method: 'GET',
      success: function(readers) {
        createBoardOfReaders(readers);
      }
    });
  }

  function handleTitlesGetRequest() {
    event.preventDefault();

               
    var requestUrl = apiRoot + 'getAllTitles';

    $.ajax({
      url: requestUrl,
      method: 'GET',
      success: function(titles) {
        createBoardOfTitles(titles);
      }
    });
  }

  function handlePiecesGetRequest() {
    event.preventDefault();

               
    var requestUrl = apiRoot + 'getAllPieces';

    $.ajax({
      url: requestUrl,
      method: 'GET',
      success: function(pieces) {
        createBoardOfOnlyPieces(pieces);
      }
    });
  }

  function handleRentalsGetRequest() {
    event.preventDefault();

               
    var requestUrl = apiRoot + 'getAllRentals';

    $.ajax({
      url: requestUrl,
      method: 'GET',
      success: function(rentals) {
        createBoardOfRents(rentals);
      }
    });
  }

  $('[add-reader-form]').on('submit', handleReaderSubmitRequest);
  $('[add-title-form').on('submit', handleTitleSubmitRequest);
  $('[add-piece-form]').on('submit', handlePieceSubmitRequest);
  $('[rent-book-form]').on('submit', handleRentSubmitRequest);
  $('[return-book-form]').on('submit', handleReturnUpdateRequest);
  $('[change-status-form]').on('submit', handlePieceUpdateRequest);
  $('[rental-piece-form]').on('submit', handleRentalPiecesGetRequest);

  $('[get-readers-button]').on('click', handleReadersGetRequest);
  $('[get-title-button]').on('click', handleTitlesGetRequest);
  $('[get-pieces-button]').on('click', handlePiecesGetRequest);
  $('[get-rentals-button]').on('click', handleRentalsGetRequest);

})

  

