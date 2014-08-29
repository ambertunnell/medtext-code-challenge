class DoctorsController < ApplicationController

  def index

  end

  def all
    @doctors = Doctor.all

     render json: @doctors
  end

  # def create
  #   @doctor = Doctor.new(doctor_params)
   
  #   respond_to do |format|
  #     if @doctor.save
  #       format.json { render json: @doctor }
  #     else
  #       format.json { render json: @doctor.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end 

  private

  # def doctor_params
  #   params.require(:doctor).permit(:address)
  # end 
end
