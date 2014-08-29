class DoctorsController < ApplicationController

  def index
  end

  def all
    @doctors = Doctor.all
     
     render json: @doctors
  end

end
