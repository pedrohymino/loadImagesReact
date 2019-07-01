import React, { Component } from 'react';
// component
import sizeMe from 'react-sizeme';
import StackGrid from "react-stack-grid";
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from 'react-bootstrap/Modal';
// import Modal from 'react-bootstrap-modal';

// API
import api from '../../services/api';
// style
import './style.scss';
import { restElement } from '@babel/types';

class Main extends Component{
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
            img: [],
            show: false,
            modal: {
                img:'',
                author: ''
            }
        };
    }
    
    
    componentDidMount(){
        this.nPage = 1;
        this.loadPhotos();
    }

    loadPhotos = async (numList=20) =>{
        await api.get('/list?page='+this.nPage+'&limit='+numList).then(res=>{
            this.setState({img: this.state.img.concat(res.data)});
            this.props.callbackParent(res.data);
            this.nPage++;
        },err=>{
            console.log('err',err);
        });
    }


    handleClose = () =>{this.setState({ show: false })}
    handleShow = (img) =>{
        this.setState({
            show: true,
            modal:{
                img: img.download_url,
                author: img.author
            }
        })
    }

    render(){
        var modalStyles = {overlay: {}};
        modalStyles.overlay["z-index"] = 90;
        const { img } = this.state;
        const { size: { width} } = this.props;

        return(
            <InfiniteScroll
                dataLength={this.state.img.length} //This is important field to render the next data
                next={this.loadPhotos}
                hasMore={true}
                scrollThreshold={0.8}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{textAlign: 'center'}}>
                    <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                
                <StackGrid columnWidth={
                    (width <= 768) ? '50%' : 
                    (width <= 992) ? '33.33%' : 
                    (width <= 1200) ? '25%' : '20%'
                } gutterWidth={15} gutterHeight={15}>
                    {img.map(img=>(
                        <div key={img.id} onClick={() => this.handleShow(img)}>
                            <img src={img.download_url} alt={img.author}/>
                        </div>
                    ))}
                </StackGrid>


                <Modal show={this.state.show} onHide={this.handleClose} style={ modalStyles }>
                    <Modal.Body>
                        <button className="close" onClick={this.handleClose}>X</button>
                        <div className="box-img">
                            <img src={this.state.modal.img} alt={img.author}/>
                            <p className="author">Author: <span>{this.state.modal.author}</span></p>
                        </div>
                    </Modal.Body>
                </Modal>
            </InfiniteScroll>
        );
    }
}


export default sizeMe()(Main);
