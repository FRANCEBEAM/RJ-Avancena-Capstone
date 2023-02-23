<?php
error_reporting(0);
class Database {
    protected $mysqli;

    function __construct(){
        $db_name = 'rjavancena2';
        $db_server = 'localhost';
        $db_user = 'root';
        $db_pass = '';

        $this->connect($db_server, $db_user, $db_pass, $db_name);
    }

    private function connect($server, $user, $pass, $name){
        $this->mysqli = new mysqli($server, $user, $pass, $name);
        
        if($this->mysqli === false)
            die("ERROR: Could not connect. " . $this->mysqli->connect_error);
    }

    function __destruct(){
        $this->mysqli = null;
    }
}

// class TestDataEncoder extends Database {
//     public function add_product($json){
//         $insert = "INSERT INTO tbl_inventory(id, image, name, size, color, price, stock, category, description, supplier, sale_price, sold) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
//         $response['success'] = false;
//         $data = json_decode($json, true);
//         $image = '["/uploads/rjavmb636de9225a989image1.jpg","/uploads/rjavmb636de9225a989image2.jpg","/uploads/rjavmb636de9225a989image3.jpg"]';
//         $id = 'rjavmb' . uniqid();
//         $name = '';
//         $size = '';
//         $color = '';
//         $price = 0;
//         $stock = 0;
//         $category = '';
//         $description = '';
//         $supplier = '';
//         $sale_price = 0;
//         $sold = 0;

//         if($stmt = $this->mysqli->prepare($insert)){
//             $stmt->bind_param('sssssdisssdi', $id, $image, $name, $size, $color, $price, $stock, $category, $description, $supplier, $sale_price, $sold);

//             $price = doubleval($data['price']);
//             $name = $data['name'];
//             $size = $data['size'];
//             $color = $data['color'];
//             $stock = $data['stock'];
//             $category = $data['category'];
//             $description = $data['description'];
//             $supplier = $data['supplier'];
//             $sale_price = $data['sale_price'];
//             $sold = $data['sold'];

//             if($stmt->execute()){
//                 $response['success'] = true;
//             }
//         }

//         //header('Content-Type: application/json');
//         echo json_encode($response);
//         //
//     }
// }

class Customer extends Database {
    private $fetch_all_products = '
        SELECT 
            serialnumber, 
            filesrc, 
            product,
            size_color,
            price, 
            quantity, 
            category, 
            specs, 
            supplier,
            sold,
            slides_001,
            slides_002,
            slides_003
        FROM
            inventory
    ';

    public function handle($type, $product, $word, $filter, $sort){
        if($type == 'products')
            $this->get_products();
        else if($type == 'add')
            $this->add_to_cart($product);
        else if($type == 'place-order')
            $this->place_order($product);
        else if($type == 'delete')
            $this->delete_cart($product);
        // else if($type == 'checkout')
        //     $this->checkout();
        else if($type == 'search')
            $this->search($word, $filter, $sort);
        else if($type == 'show-cart')
            $this->show_cart();
        else if($type == 'show-orders')
            $this->show_orders();
        else if($type == 'cancel-order')
            $this->cancel_order($product, $word);
        else if($type == 'shipping-info')
            $this->shipping_info();
        else if($type == 'extra-image')
            $this->extra_image($product);
    }

    private function extra_image($items){
        $response = $this->init_response('');
        $response['image'] = [];
        $response['size_color'] = [];

        $read = "SELECT filesrc, size_color FROM inventory WHERE serialnumber = ?";
        $stmt = $this->mysqli->prepare($read);

        for($i = 0; !empty($items['ids'][$i]); $i++){
            $stmt->bind_param('s', $items['ids'][$i]);
            
            if($stmt->execute()){
                $stmt->store_result();

                if($stmt->num_rows == 1){
                    $stmt->bind_result($response['image'][$i], $response['size_color'][$i]);
                    
                    if($stmt->fetch()){
                        $response['success'] = true;
                    }
                } else {
                    $response['error'] = 'Product not found. ('. $i .')';
                }
            } else {
                $response['error'] = 'Failed to execute. ('. $i .')';
            }
        }

        $this->send_response($response);
    }

    private function shipping_info(){
        $response['success'] = false;
        $response['base'] = 0;
        $response['quantity_limit'] = 0;
        $response['item_count_limit'] = 0;
        $response['increase'] = 0;

        $stmt = $this->mysqli->query('SELECT * FROM shipping_matrix WHERE 1');
        if($stmt->num_rows == 1){
            $row = $stmt->fetch_assoc();
            $response['base'] = $row['base'];
            $response['quantity_limit'] = $row['quantity_limit'];
            $response['item_count_limit'] = $row['item_count_limit'];
            $response['increase'] = $row['increase'];
            $response['success'] = true;
        }

        $this->send_response($response);
    }

    private function init_response($type){
        $response['success'] = false;
        $response['error'] = '';
        $response['status'] = '';

        if($type == 'fetch all products'){
            $response['categories'] = [];
            $response['id'] = [];
            $response['image'] = [];
            $response['name'] = [];
            $response['size_color'] = [];
            $response['price'] = [];
            $response['stock'] = [];
            $response['category'] = [];
            $response['description'] = [];
            $response['supplier'] = [];
            $response['sold'] = [];
            $response['slide1'] = [];
            $response['slide2'] = [];
            $response['slide3'] = [];
        }

        return $response;
    }

    private function send_response($response){
        //header('Content-Type: application/json');
        echo json_encode($response);
        //
    }

    private function get_products(){
        $response = $this->init_response('fetch all products');

        if($stmt1 = $this->mysqli->query('SELECT category FROM inventory GROUP BY prefix')){
            if($stmt1->num_rows == 0)
                array_push($response['categories'], 'Empty');
            else {
                while($row1 = $stmt1->fetch_assoc())
                    array_push($response['categories'], $row1['category']);
                
                if($stmt2 = $this->mysqli->query($this->fetch_all_products)){
                    $response['success'] = true;

                    if($stmt2->num_rows > 0){
                        while($row2 = $stmt2->fetch_assoc()){

                            array_push($response['image'], $row2['filesrc']);
                            array_push($response['slide1'], $row2['slides_001']);
                            array_push($response['slide2'], $row2['slides_002']);
                            array_push($response['slide3'], $row2['slides_003']);
                            array_push($response['id'], $row2['serialnumber']);
                            array_push($response['name'], $row2['product']);
                            array_push($response['size_color'], $row2['size_color']);
                            array_push($response['price'], $row2['price']);
                            array_push($response['stock'], $row2['quantity']);
                            array_push($response['category'], $row2['category']);
                            array_push($response['description'], $row2['specs']);
                            array_push($response['supplier'], $row2['supplier']);
                            array_push($response['sold'], $row2['sold']);
                        }
                    }
                } else
                    $response['error'] = 'Something went wrong, please try again later. (2)';
            }
                
        } else
            $response['error'] = 'Something went wrong, please try again later. (1)';

        //$stmt1->close();
        $this->send_response($response);
    }

    private function search($word, $filter, $sort){
        $response['success'] = false;
        $response['error'] = '';
        $response['status'] = '';
    
        if(!empty($word)){
            $word = trim($word);
            $word = '%' . $word . '%';
    
            if($filter != 'all'){
                // $this->fetch_all_products : eto yung iniba mo kanina 
                $search = $this->fetch_all_products . " WHERE (product LIKE ? OR specs LIKE ? OR category LIKE ? OR id = ?) AND category = ? ";
    
                if(($sort == '') || ($sort == null) || ($sort == 'popular')){
                    $search = $search . ' ORDER BY sold DESC ';
                }
                else if($sort == 'pricelow'){
                    $search = $search . ' ORDER BY price ASC ';
                }
                else if($sort == 'pricehigh'){
                    $search = $search . ' ORDER BY price DESC ';
                }
    
                if($stmt = $this->mysqli->prepare($search)){
                    // eto addjust, pero in-adjust ko na, check mo na lang ulit
                    $stmt->bind_param('sssss', $word, $word, $word, $word, $filter);
    
                    if($stmt->execute()){
                        $stmt->store_result();
                        $response['success'] = true;
    
                        if($stmt->num_rows > 0){
                            for($i = 0; $i < $stmt->num_rows; $i++){
    
                                // eto bawasan mo based sa naka-SELECT dun sa $this->fetch_all_products
                                // di ko kabisado column names sa table mo
                                // naayos ko na ata to
                                $stmt->bind_result(
                                    $response['id'][$i],
                                    $response['image'][$i],
                                    $response['name'][$i],
                                    $response['size_color'][$i],
                                    $response['price'][$i],
                                    $response['stock'][$i],
                                    $response['category'][$i],
                                    $response['description'][$i],
                                    $response['supplier'][$i],
                                    $response['sold'][$i],
                                    $response['slide1'][$i],
                                    $response['slide2'][$i],
                                    $response['slide3'][$i]
                                );
    
                                $stmt->fetch();
                            }
                        }
                    } else {
                        $response['error'] = 'Something went wrong, please try again later. (2)';
                    }
                } else {
                    $response['error'] = 'Something went wrong, please try again later. (1) all';
                }
            } else {
                // eto naman yung query kapag walang category selected
                // bale same query pero 4 statement bind parameters lang
                $search = $this->fetch_all_products . " 
                    WHERE (
                        product LIKE ?
                        OR 
                        specs LIKE ? 
                        OR  
                        category LIKE ? 
                        OR 
                        serialnumber = ?
                    ) 
                ";
    
                if(($sort == '') || ($sort == null) || ($sort == 'popular')){
                    $search = $search . ' ORDER BY sold DESC ';
                }
                else if($sort == 'pricelow'){
                    $search = $search . ' ORDER BY price ASC ';
                }
                else if($sort == 'pricehigh'){
                    $search = $search . ' ORDER BY price DESC ';
                }
    
                if($stmt = $this->mysqli->prepare($search)){
                    // no filter dahil all categories to
                    $stmt->bind_param('ssss', $word, $word, $word, $word);
    
                    if($stmt->execute()){
                        $stmt->store_result();
                        $response['success'] = true;
    
                        if($stmt->num_rows > 0){
                            for($i = 0; $i < $stmt->num_rows; $i++){
    
                                // adjust mo rin based sa SELECT columns sa $this->fetch_all_products mo
                                // eto rin ata naayos ko na ata
                                // working na yung search
                                $stmt->bind_result(
                                    $response['id'][$i],
                                    $response['image'][$i],
                                    $response['name'][$i],
                                    $response['size_color'][$i],
                                    $response['price'][$i],
                                    $response['stock'][$i],
                                    $response['category'][$i],
                                    $response['description'][$i],
                                    $response['supplier'][$i],
                                    $response['sold'][$i],
                                    $response['slide1'][$i],
                                    $response['slide2'][$i],
                                    $response['slide3'][$i]
                                );
    
                                $stmt->fetch();
                            }
                        }
                    } else {
                        $response['error'] = 'Something went wrong, please try again later. (2)';
                    }
                } else {
                    $response['error'] = 'Something went wrong, please try again later. (1)';
                }
            }
        }
    
        $this->send_response($response);
    }

    private function add_to_cart($product){
        $response['success'] = false;
        $response['error'] = '';
        $response['status'] = '';

        $product = json_decode($product, true);

        if($this->check_user_cart($_SESSION['user_id']) == true){
            $response = $this->update_cart($product, $response);
        } else if($this->check_user_cart($_SESSION['user_id']) == false){
            if($this->insert_new_cart($product) == true){
                $response['success'] = true;
                $response['status'] = 'New item added to cart.';
            }
        }

        $this->send_response($response);
    }

    private function update_cart($json, $response){
        $read = "SELECT cart FROM tbl_cart WHERE user_id = ?";
        $update = "UPDATE tbl_cart SET cart = ? WHERE user_id = ?";

        $user_id = $_SESSION['user_id'];
        
        if($stmt1 = $this->mysqli->prepare($read)){
            $stmt1->bind_param('s', $user_id);

            if($stmt1->execute()){
                $stmt1->store_result();

                $old_cart = '';

                $stmt1->bind_result($old_cart);

                if($stmt1->fetch()){
                    $old_cart = json_decode($old_cart, true);
                    $present = false;

                    for($i = 0; !empty($old_cart['id'][$i]); $i++){
                        if($old_cart['id'][$i] == $json['id']){
                            $present = true;
                            $old_cart['quantity'][$i] = $json['quantity'];
                            $response['status'] = 'Quantity on cart is updated.';
                        }
                    }

                    if($present == false){
                        array_push($old_cart['id'], $json['id']);
                        array_push($old_cart['quantity'], $json['quantity']);
                        $response['status'] = 'Item added to cart.';
                    }
                    
                    $new_cart = json_encode($old_cart);

                    if($stmt2 = $this->mysqli->prepare($update)){
                        $stmt2->bind_param('ss', $new_cart, $user_id);

                        if($stmt2->execute()){
                            $response['success'] = true;

                            return $response;
                        } else {
                            $response['error'] = 'Something went wrong, please try again later. (3)';

                            return $response;
                        }
                    } else {
                        $response['error'] = 'Something went wrong, please try again later. (2)';

                        return $response;
                    }
                }
            } else {
                $response['error'] = 'Something went wrong, please try again later. (1)';

                return $response;
            }
        }
    }

    private function insert_new_cart($json){
        $insert = "INSERT INTO tbl_cart (user_id, cart) VALUES (?,?)";
        $cart['id'] = [];
        $cart['quantity'] = [];
        $jsoncart = '';
        $user_id = '';

        if($stmt = $this->mysqli->prepare($insert)){
            $stmt->bind_param('ss', $user_id, $jsoncart);

            array_push($cart['id'], $json['id']);
            array_push($cart['quantity'], $json['quantity']);

            $jsoncart = json_encode($cart);
            $user_id = $_SESSION['user_id'];

            if($stmt->execute()){
                return true;
            } else {
                return false;
            }
        }
    }

    private function check_user_cart($user_id){
        $check = 'SELECT user_id FROM tbl_cart WHERE user_id = ?';

        if($stmt = $this->mysqli->prepare($check)){
            $stmt->bind_param('s', $user_id);

            if($stmt->execute()){
                $stmt->store_result();

                if($stmt->num_rows == 1){
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    private function show_cart(){
        $response = $this->init_response('fetch all products');
        $response['quantity'] = [];

        $fetch_cart = "SELECT cart FROM tbl_cart WHERE user_id = ?";
        $user_id = '';

        if($stmt1 = $this->mysqli->prepare($fetch_cart)){
            $stmt1->bind_param('s', $user_id);

            $user_id = $_SESSION['user_id'];

            if($stmt1->execute()){
                $jsoncart = '';
                
                $stmt1->store_result();

                if($stmt1->num_rows > 0){
                    $stmt1->bind_result($jsoncart);

                    if($stmt1->fetch()){
                        //$response['status'] = $jsoncart;
                        $jsoncart = json_decode($jsoncart, true);

                        $fetch_data = $this->fetch_all_products . " WHERE serialnumber = ?";

                        $count = 0;

                        for($i = 0; !empty($jsoncart['id'][$i]); $i++){
                            $temp_id = $jsoncart['id'][$i];

                            if($stmt2 = $this->mysqli->prepare($fetch_data)){
                                $stmt2->bind_param('s', $temp_id);

                                if($stmt2->execute()){
                                    $stmt2->store_result();

                                    if($stmt2->num_rows == 1){

                                        // serialnumber, 
                                        // filesrc, 
                                        // product,
                                        // price, 
                                        // quantity, 
                                        // category, 
                                        // specs, 
                                        // supplier, 
                                        // shipping,
                                        // sold,
                                        // slides_001,
                                        // slides_002,
                                        // slides_003

                                        $stmt2->bind_result(
                                            $response['id'][$i],
                                            $response['image'][$i],
                                            $response['name'][$i],
                                            $response['size_color'][$i],
                                            $response['price'][$i],
                                            $response['stock'][$i],
                                            $response['category'][$i],
                                            $response['description'][$i],
                                            $response['supplier'][$i],
                                            $response['sold'][$i],
                                            $response['slide1'][$i],
                                            $response['slide2'][$i],
                                            $response['slide3'][$i]
                                        );
            
                                        $stmt2->fetch();

                                        if($response['stock'][$i] >= $jsoncart['quantity'][$i]){
                                            $response['quantity'][$i] = $jsoncart['quantity'][$i];
                                        } else {
                                            $jsoncart['quantity'][$i] = $response['stock'][$i];
                                            $response['quantity'][$i] = $jsoncart['quantity'][$i];
                                            $count++;
                                        }
                                    } else {
                                        $response['error'] = 'Product not found.';
                                    }
                                } else {
                                    $response['error'] = 'Something went wrong, please try again later. (5)';
                                }
                            } else {
                                $response['error'] = 'Something went wrong, please try again later. (4)';
                            }
                        }

                        $newjsoncart = json_encode($jsoncart);

                        if($this->update_fetched_cart($newjsoncart) == true){
                            $response['success'] = true;
                            $response['status'] = $count . ' cart item(s) updated.';
                        }
                    } else {
                        $response['error'] = 'Something went wrong, please try again later. (3)';
                    }
                } else {
                    $response['success'] = true;
                    $response['status'] = 'No saved products on cart.';
                }
            } else {
                $response['error'] = 'Something went wrong, please try again later. (2)';
            }
        } else {
            $response['error'] = 'Something went wrong, please try again later. (1)';
        }

        $this->send_response($response);
    }

    private function update_fetched_cart($updatedcart){
        $update = "UPDATE tbl_cart SET cart = ? WHERE user_id = ?";
        $user_id = $_SESSION['user_id'];

        if($stmt = $this->mysqli->prepare($update)){
            $stmt->bind_param('ss', $updatedcart, $user_id);

            if($stmt->execute()){
                return true;
            }
        }
    }

    private function delete_cart($json){
        $response = $this->init_response('');
        $json = json_decode($json, true);
        $id = $json['id'];
        $user_id = $_SESSION['user_id'];

        $read = "SELECT cart FROM tbl_cart WHERE user_id = ?";
        $update = "UPDATE tbl_cart SET cart = ? WHERE user_id = ?";

        if($stmt1 = $this->mysqli->prepare($read)){
            $stmt1->bind_param('s', $user_id);

            if($stmt1->execute()){
                $stmt1->store_result();
                $cart = '';
                $stmt1->bind_result($cart);

                if($stmt1->fetch()){
                    $cart = json_decode($cart, true);

                    for($i = 0; !empty($cart['id'][$i]); $i++){
                        if($id == $cart['id'][$i]){
                            // $response['status'] .= $cart['id'][$i];
                            array_splice($cart['id'], $i, 1);
                            array_splice($cart['quantity'], $i, 1);
                        }
                    }

                    $cart = json_encode($cart);

                    if($stmt2 = $this->mysqli->prepare($update)){
                        $stmt2->bind_param('ss', $cart, $user_id);

                        if($stmt2->execute()){
                            $response['success'] = true;
                            $response['status'] .= 'Deleted item from cart.';
                        } else {
                            $response['error'] = 'Something went wrong, please try again later. (5)';
                        }
                    } else {
                        $response['error'] = 'Something went wrong, please try again later. (4)';
                    }
                } else {
                    $response['error'] = 'Something went wrong, please try again later. (3)';
                }
            } else {
                $response['error'] = 'Something went wrong, please try again later. (2)';
            }
        } else {
            $response['error'] = 'Something went wrong, please try again later. (1)';
        }

        $this->send_response($response);
    }

    private function place_order($cart){
        $response = $this->init_response('');

        $new_order = "INSERT INTO tbl_transactions(transaction_id, user_id, customer_name, downpayment, gcash_ref_num, type, purchased_items, status, total_price, shipping, discount, finalprice, address, cashchange) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        $user_id = $_SESSION['user_id'];
        $transaction_id = 't' . uniqid();
        $response['transaction_id'] = $transaction_id;
        $type = 'Online';
        $customer = $cart['customer'];
        $downpayment = doubleval($cart['downpayment']);
        $gcash_ref_num = $cart['gcash_ref_num'];
        // name adjustments, doesnt match walk-in saved transaction
        $purchased_items['ids'] = $cart['id'];
        $purchased_items['names'] = $cart['name'];
        $purchased_items['quantities'] = $cart['quantity'];
        $total_price = $cart['total'];
        $purchased_items['subtotals'] = $cart['subtotal'];
        $status = 'pending';
        $discount = 0;
        $cash_change = 0;
        $address = $cart['address'];
        $finalprice = doubleval($cart['total']) + doubleval($cart['shipping']);
        $shipping = doubleval($cart['shipping']);
        $purchased_items['total'] = $finalprice - $downpayment;

        $check_stocks = "SELECT quantity FROM inventory WHERE serialnumber = ?";
        $deduct_stocks = "UPDATE inventory SET quantity = (quantity - ?) WHERE serialnumber = ?";

        for($i = 0; !empty($purchased_items['ids'][$i]); $i++){
            $stmt5 = $this->mysqli->prepare($check_stocks);
            $stmt5->bind_param('s', $purchased_items['id'][$i]);
            
            if($stmt5->execute()){
                $stmt5->store_result();

                if($stmt5->num_rows == 1){
                    $available_stock = 0;
                    $stmt5->bind_result($available_stock);
                    $stmt5->fetch();

                    if($available_stock > $purchased_items['quantities'][$i]){
                        $stmt6 = $this->mysqli->prepare($deduct_stocks);
                        $stmt6->bind_param('is', $purchased_items['quantities'][$i], $purchased_items['ids'][$i]);

                        if($stmt6->execute()){
                            $response['status'] = 'deducted stock from the database.';
                        }
                    }
                }
            }
        }
        
        if($stmt = $this->mysqli->prepare($new_order)){
            $stmt->bind_param('sssdssssddddsd', $transaction_id, $user_id, $customer, $downpayment, $gcash_ref_num, $type, $purchased_items, $status, $total_price, $shipping, $discount, $finalprice, $address, $cash_change);

            $purchased_items = json_encode($purchased_items);

            if($stmt->execute()){
                $read = "SELECT cart FROM tbl_cart WHERE user_id = ?";
                $update = "UPDATE tbl_cart SET cart = ? WHERE user_id = ?";

                for($y = 0; !empty($cart['id'][$y]); $y++){
                    if($stmt1 = $this->mysqli->prepare($read)){
                        $stmt1->bind_param('s', $user_id);

                        if($stmt1->execute()){
                            $stmt1->store_result();
                            $old_cart = '';
                            $stmt1->bind_result($old_cart);

                            if($stmt1->fetch()){
                                $old_cart = json_decode($old_cart, true);

                                for($i = 0; !empty($old_cart['id'][$i]); $i++){
                                    if($cart['id'][$y] == $old_cart['id'][$i]){
                                        // $response['status'] .= $cart['id'][$i];
                                        array_splice($old_cart['id'], $i, 1);
                                        array_splice($old_cart['quantity'], $i, 1);
                                    }
                                }

                                $old_cart = json_encode($old_cart);

                                if($stmt2 = $this->mysqli->prepare($update)){
                                    $stmt2->bind_param('ss', $old_cart, $user_id);

                                    if($stmt2->execute()){
                                        $response['success'] = true;
                                    } else {
                                        $response['error'] = 'Something went wrong, please try again later. (7)';
                                    }
                                } else {
                                    $response['error'] = 'Something went wrong, please try again later. (6)';
                                }
                            } else {
                                $response['error'] = 'Something went wrong, please try again later. (5)';
                            }
                        } else {
                            $response['error'] = 'Something went wrong, please try again later. (4)';
                        }
                    } else {
                        $response['error'] = 'Something went wrong, please try again later. (3)';
                    }
                }

            } else {
                $response['error'] = 'Something went wrong, please try again later. (2)';
            }
        } else {
            $response['error'] = 'Something went wrong, please try again later. (1)';
        }

        $this->send_response($response);
    }

    private function show_orders(){
        $response = $this->init_response('');
        $response['transaction_id'] = [];
        $response['items'] = [];
        $response['status'] = [];
        $response['transaction_date'] = [];
        $response['downpayment'] = [];
        $response['gcash_ref_num'] = [];
        $response['finalprice'] = [];
        $response['est_delivery'] = [];
        $response['customer'] = [];
        $response['address'] = [];
        $response['image'] = [];
        $user_id = $_SESSION['user_id'];

        $read = "SELECT customer_name, address, transaction_id, transaction_date, purchased_items, status, est_delivery, downpayment, gcash_ref_num, finalprice FROM tbl_transactions WHERE user_id = ? ORDER BY transaction_date DESC";

        if($stmt = $this->mysqli->prepare($read)){
            $stmt->bind_param('s', $user_id);

            if($stmt->execute()){
                $stmt->store_result();

                if($stmt->num_rows > 0){
                    for($i = 0; $i < $stmt->num_rows; $i++){
                        $stmt->bind_result(
                            $response['customer'][$i],
                            $response['address'][$i],
                            $response['transaction_id'][$i],
                            $response['transaction_date'][$i],
                            $response['items'][$i],
                            $response['status'][$i],
                            $response['est_delivery'][$i],
                            $response['downpayment'][$i],
                            $response['gcash_ref_num'][$i],
                            $response['finalprice'][$i]
                        );

                        if($stmt->fetch()){
                            $response['success'] = true;
                        } else {
                            $response['error'] = 'Something went wrong, please try again later. (3)';
                        }
                    }
                } else {
                    $response['success'] = true;
                }
            } else {
                $response['error'] = 'Something went wrong, please try again later. (2)';
            }
        } else {
            $response['error'] = 'Something went wrong, please try again later. (1)';
        }

        $this->send_response($response);
    }

    private function cancel_order($transaction_id, $reason){
        $response = $this->init_response('');
        $new_status = 'cancelled ' . $reason;
        $user_id = $_SESSION['user_id'];

        $cancel_order = "UPDATE tbl_transactions SET status = ? WHERE transaction_id = ? AND user_id = ?";
        $get_ordered = "SELECT purchased_items FROM tbl_transactions WHERE transaction_id = ?";
        $return_stocks = "UPDATE inventory SET quantity = (quantity + ?) WHERE serialnumber = ?";
        $items = '';

        $stmt1 = $this->mysqli->prepare($get_ordered);
        $stmt1->bind_param('s', $transaction_id);

        if($stmt1->execute()){
            $stmt1->store_result();

            if($stmt1->num_rows == 1){
                $stmt1->bind_result($items);

                if($stmt1->fetch()){
                    $items = json_decode($items, true);

                    for($i = 0; !empty($items['id'][$i]); $i++){
                        $stmt2 = $this->mysqli->prepare($return_stocks);
                        $stmt2->bind_param('is', $items['quantity'][$i], $items['id'][$i]);
                        $stmt2->execute();
                    }

                    if($stmt = $this->mysqli->prepare($cancel_order)){
                        $stmt->bind_param('sss', $new_status, $transaction_id, $user_id);
            
                        if($stmt->execute()){
                            $response['success'] = true;
                        } else {
                            $response['error'] = 'Something went wrong, please try again later. (2)';
                        }
                    } else {
                        $response['error'] = 'Something went wrong, please try again later. (1)';
                    }
                }
            }
        } else {
            $response['status'] = 'Failed to execute read statement.';
        }

        $this->send_response($response);
    }
}