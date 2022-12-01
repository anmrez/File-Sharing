import { Injectable } from "@angular/core";
import { interval } from "rxjs";



@Injectable({
  providedIn: 'root',
})
export class FileTimeService {

  timeFile: ( string | number )[] = []
  timeLifeFile: number[] = []
  isUpdated: boolean = false

  constructor (){

  }


  updateInterval(  ){

    if ( this.isUpdated ) return
    this.isUpdated = true

    interval( 1000 ).subscribe( () => {
      this.update(  )
    })
    // interval( 10_000 ).subscribe( () => {
    //   console.log( this.timeLifeFile )
    //   console.log( this.timeFile )
    // })

  }


  set( time: Date | string ){

    let timeInfinity: boolean = false
    
    let nowDate = new Date().getTime()
    let fileDate = new Date( time ).getTime()
    
    if ( new Date(0).getTime() === fileDate ) timeInfinity = true
    if ( timeInfinity ) {
      this.pushTime( -1 )
      return
    }
    
    let diff = fileDate - nowDate
    if ( diff < 0 ) {
      this.pushTime( -2 )
      return
    }

    this.pushTime( fileDate )

  }
  

  update(){

    this.timeLifeFile.forEach( ( time, index ) => {

      if ( time !== -1 && time !== -2 ) {

        this.updateTime( time, index )

      }

      if ( time === -2 ) this.timeFile[index] = 'delete'

    })

  }


  // private  ======


  private updateTime( fileDate: number, index: number ) {

    let nowDate = new Date().getTime() 
    let diff = fileDate - nowDate 

    let timeStr: string = ''
    let second = {
      is: false,
      time: 1000
    } 
    let minute = {
      is: false,
      time: second.time * 60
    } 
    let hour ={
      is: false,
      time: minute.time * 60
    } 
    let day = {
      is: false,
      time: hour.time * 24
    } 

    // day
    if ( Math.floor( diff / day.time ) > 0 ){

      day.is = true
      let amountDay: number = Math.floor( diff / day.time )
      timeStr += amountDay
      diff = diff - amountDay * day.time

      if ( amountDay === 1 ) this.timeFile[index] = amountDay + ' day'
      if ( amountDay > 1 ) this.timeFile[index] = amountDay + ' days'
      return

    }

    // hour
    if ( Math.floor( diff / hour.time ) > 0 ){

      hour.is = true
      let amountHour: number = Math.floor( diff / hour.time )
      if ( day.is ) {
        // timeStr += ':' + amountHour
        if ( amountHour < 10 ) timeStr += ':0' + amountHour
        if ( amountHour >= 10 ) timeStr += ':' + amountHour
      } else {
        // timeStr += amountHour
        if ( amountHour < 10 ) timeStr += '0' + amountHour
        if ( amountHour >= 10 ) timeStr += amountHour
      }
      diff = diff - amountHour * hour.time

    } else {

      timeStr += '00'

    }
    
    // minute
    if ( Math.floor( diff / minute.time ) > 0 ){

      minute.is = true
      let amountMinute: number = Math.floor( diff / minute.time )
      if ( hour.is ) {
        if ( amountMinute < 10 ) timeStr += ':0' + amountMinute
        if ( amountMinute >= 10 ) timeStr += ':' + amountMinute
      } else {
        // timeStr += amountMinute
        if ( amountMinute < 10 ) timeStr += ':0' + amountMinute
        if ( amountMinute >= 10 ) timeStr += ':' + amountMinute
      }
      diff = diff - amountMinute * minute.time

    }

    // second
    if ( Math.floor( diff / second.time ) > 0 ){

      second.is = true
      let amountSecond: number = Math.floor( diff / second.time )
      if ( minute.is ) {
        if ( amountSecond < 10 ) timeStr += ':0' + amountSecond
        if ( amountSecond >= 10 ) timeStr += ':' + amountSecond
      } else {
        if ( amountSecond < 10 ) timeStr += '0' + amountSecond
        if ( amountSecond >= 10 ) timeStr += amountSecond
        // timeStr += amountSecond
      }
      diff = diff - amountSecond * second.time

    } else {

      timeStr += ':00'

    }

    // this.pushTime( timeStr )

    this.timeFile[index] = timeStr

  }

  private pushTime( data: number | string ){

    this.timeFile.push( data )
    if ( typeof data === 'string' ) {
      this.timeLifeFile.push( -2 )
    } else {
      this.timeLifeFile.push( data )
    }


  }

}