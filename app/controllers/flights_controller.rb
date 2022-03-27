# frozen_string_literal: true

# Flight scheduler
class FlightsController < ApplicationController
  before_action :set_flight, only: %i[edit update destroy]

  def index
    @flights = Flight.all
  end

  def new
    @flight = Flight.new
  end

  def create
    @flight = Flight.new(flight_params)
    if @flight.save
      redirect_to root_path, notice: 'Delete Successful'
    else
      flash[:error] = 'Failed to edit Flight!'
      render :new
    end
  end

  def edit
  end

  def update

  end

  def destroy
    if @flight.destroy
      redirect_to root_path, notice: 'Delete Successful'
    else
      redirect_to root_path, error: 'Not Able to Delete !'
    end
  end

  private

  def flight_params
    params.require(:flight).permit(:from, :to, :departure, :arrival, :status)
  end

  def set_flight
    @flight = Flight.find(params[:id])
  end

end
